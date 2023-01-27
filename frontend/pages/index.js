import MainView from '../components/MainView';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import styles from '../styles/Home.module.css'

export default function Home() {

  const {connected} = useWallet()
  return (
    <div className="app">
     {connected ? (
        <MainView/>
     ): (
      <div className="loginContainer">
        <div className="loginTitle">Login to SocioFi</div>
        <div className="loginSubtitle">
          Manage your account, check notifications, comment videos, more
          </div>
          <WalletMultiButton/>
      </div>
     )}
    </div>
  )
}
