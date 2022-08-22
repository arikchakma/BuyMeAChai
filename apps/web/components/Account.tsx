import { formatAddress } from '@/utils/formatAddress';
import { useAccount, useBalance, useEnsName } from 'wagmi';

export default function Account() {
  const { address, isConnected } = useAccount();
  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    addressOrName: address,
  });
  const { data: ensName } = useEnsName({ address });

  return (
    <div className="sticky top-5">
      {ensName ? (
        <h1>ENS: {ensName}</h1>
      ) : (
        <h1>Address: {formatAddress(address as any)}</h1>
      )}
      <p>
        Balance: {balance?.formatted} {balance?.symbol}
      </p>
    </div>
  );
}
