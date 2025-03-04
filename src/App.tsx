import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ActionButtonList } from './components/ActionButtonList'
import { SmartContractActionButtonList } from './components/SmartContractActionButtonList'
import { InfoList } from './components/InfoList'
import { projectId, metadata, networks, wagmiAdapter, customId } from './config'

import "./App.css"

import { BackButton } from './components/BackButton'
import { AppRoot } from '@telegram-apps/telegram-ui'
import '@telegram-apps/telegram-ui/dist/styles.css';

const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'dark' as const,
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function App() {
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>(undefined);
  const [signedMsg, setSignedMsg] = useState('');
  const [balance, setBalance] = useState('');

  const receiveHash = (hash: `0x${string}`) => {
    setTransactionHash(hash); // Update the state with the transaction hash
  };

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg); // Update the state with the transaction hash
  };

  const receivebalance = (balance: string) => {
    setBalance(balance)
  }


  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppRoot >

          <div className={"pages"}>

            <BackButton />

            <img src={`${import.meta.env.BASE_URL}logo.webp`} alt="Sonic Money Pool" style={{ width: '150px', height: '150px' }} />
            <h1>Sonic Money Pool Mini App</h1>
            <appkit-button />
            <ActionButtonList sendHash={receiveHash} sendSignMsg={receiveSignedMsg} sendBalance={receivebalance} />
            <SmartContractActionButtonList />
            <InfoList hash={transactionHash} signedMsg={signedMsg} balance={balance} />
          </div>
        </AppRoot>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
