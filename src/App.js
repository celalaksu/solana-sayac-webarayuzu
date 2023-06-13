import "./App.css";

import Appbar from "./components/Appbar";
import styles from "./styles/Home.module.css";
import WalletContextProvider from "./components/WalletContextProvider";
import Counter from "./components/Counter";

require("@solana/wallet-adapter-react-ui/styles.css");

function App(props) {
  return (
    <div className={styles.App}>
      <head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </head>
      <WalletContextProvider>
        <Appbar />
        <div className={styles.AppBody}>
          <Counter />
        </div>
      </WalletContextProvider>
    </div>
  );
}
export default App;
