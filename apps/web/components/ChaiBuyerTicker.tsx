import { useContractRead } from 'wagmi';

import { contractAddress, ensRegistryABI } from '@/utils/contractData';
import Ticker from './Ticker';

export default function ChaiBuyerTicker() {
  // Retriving all memos
  const { data } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: ensRegistryABI,
    functionName: 'getMemos',
  });

  return (
    <div className="flex w-screen items-center gap-5 overflow-hidden bg-slate-900 text-white">
      <Ticker className="animate-ticker-loop duration-[120s] hover:[animation-play-state:paused]">
        <div className="flex items-center">
          {data?.map((memo: any) => (
            <span
              key={memo}
              className="flex items-center gap-4 whitespace-nowrap px-2 py-2 text-slate-100"
            >
              <span className="font-medium">{memo.name}</span>{' '}
              <span>{'>>'}</span>
            </span>
          ))}
          {data?.map((memo: any) => (
            <span
              key={memo}
              className="flex items-center gap-4 whitespace-nowrap px-2 py-2 text-slate-100"
            >
              <span className="font-medium">{memo.name}</span>{' '}
              <span>{'>>'}</span>
            </span>
          ))}
        </div>
      </Ticker>
    </div>
  );
}
