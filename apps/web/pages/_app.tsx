// include styles from the ui package
import 'ui/styles.css';

import '../styles/globals.css';

import type { AppProps } from 'next/app';
import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
  chain,
} from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({ apiKey: process.env.GOERLI_API_KEY, priority: 0 }),
    publicProvider({ priority: 1 }),
  ]
);

const client = createClient({
  // autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [new MetaMaskConnector({ chains })],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
