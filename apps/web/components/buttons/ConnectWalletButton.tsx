import { useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function ConnectWalletButton() {
  const { connect } = useConnect({
    // Metamask Connector
    connector: new InjectedConnector(),
  });

  return (
    <button
      onClick={() => connect()}
      className="rounded-sm bg-slate-900 px-5 py-2 font-bold text-slate-100"
    >
      Connect Wallet
    </button>
  );
}

ConnectWalletButton.displayName = 'ConnectWallet';
