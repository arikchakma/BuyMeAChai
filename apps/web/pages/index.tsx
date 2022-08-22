import { useAccount } from 'wagmi';
import ConnectWalletButton from '../components/buttons/ConnectWalletButton';
import ChaiSent from '@/components/ChaiSent';
import AllMemos from '@/components/AllMemos';
import ChaiBuyerTicker from '@/components/ChaiBuyerTicker';
import Account from '@/components/Account';

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <main className="">
      {isConnected ? (
        <div>
          <ChaiBuyerTicker />
          <div className="relative grid grid-cols-[repeat(13,1fr)] gap-5 p-5">
            <div className="col-span-3">
              <ChaiSent />
            </div>
            <div className="col-span-4">
              <AllMemos />
            </div>
            <div className="col-span-3">
              <Account />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <ConnectWalletButton />
        </div>
      )}
    </main>
  );
}
