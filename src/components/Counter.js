import { useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import idl from "../idl.json";

import { useWallet } from "@solana/wallet-adapter-react";
require("@solana/wallet-adapter-react-ui/styles.css");

const { SystemProgram, Keypair } = web3;
/* create an account  */
const opts = {
  preflightCommitment: "processed",
};
const programID = new PublicKey(idl.metadata.address);

function Counter() {
  const [value, setValue] = useState("");
  const wallet = useWallet();

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    // const network = "http://127.0.0.1:8899";
    const network = clusterApiUrl("devnet");
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new AnchorProvider(
      connection,
      wallet,
      opts.preflightCommitment
    );
    return provider;
  }

  async function createCounter() {
    const provider = await getProvider();

    const [counter, _counterBump] = await web3.PublicKey.findProgramAddress(
      [provider.wallet.publicKey.toBytes()],
      programID
    );
    /* create the program interface combining the idl, program ID, and provider */
    const program = new Program(idl, programID, provider);

    try {
      /* interact with the program via rpc */
      await program.rpc.createCounter({
        accounts: {
          authority: provider.wallet.publicKey,
          counter: counter,
          systemProgram: SystemProgram.programId,
        },
        signers: [],
      });

      const account = await program.account.counter.fetch(counter);
      console.log("account: ", account);
      setValue(account.count.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function increment() {
    const provider = await getProvider();
    const [counter, _counterBump] = await web3.PublicKey.findProgramAddress(
      [provider.wallet.publicKey.toBytes()],
      programID
    );
    const program = new Program(idl, programID, provider);
    await program.rpc.updateCounter({
      accounts: {
        authority: provider.wallet.publicKey,
        counter: counter,
      },
    });

    const account = await program.account.counter.fetch(counter);
    console.log("account: ", account);
    setValue(account.count.toString());
  }

  if (!wallet.connected) {
    /* If the user's wallet is not connected, display connect wallet button. */
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        Cüzdana bağalanın
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>
          {!value && <button onClick={createCounter}>Create counter</button>}
          {value && <button onClick={increment}>Increment counter</button>}

          {value && value >= Number(0) ? (
            <h2>{value}</h2>
          ) : (
            <h3>Please create the counter.</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Counter;
