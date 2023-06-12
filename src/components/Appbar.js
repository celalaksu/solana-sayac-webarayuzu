import React from "react";

import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function Appbar() {
  return (
    <div className={styles.AppHeader}>
      <img src="/solanaLogo.png" height={30} width={200} />
      <span>Counter Örneği</span>
      <WalletMultiButton />
    </div>
  );
}

export default Appbar;
