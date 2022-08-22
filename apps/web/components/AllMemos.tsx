import { useState } from 'react';
import { useContractEvent, useContractRead } from 'wagmi';
import { contractAddress, ensRegistryABI } from '@/utils/contractData';

export default function AllMemos() {
  const [memos, setMemos] = useState<[] | any>([]);

  const onNewMemo = (
    from: string,
    timestamp: any,
    name: string,
    message: string
  ) => {
    setMemos((prevState: any) => [
      ...prevState,
      {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message,
        name,
      },
    ]);
  };

  // Retriving all memos
  const { data: getMemosData } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: ensRegistryABI,
    functionName: 'getMemos',
    onSuccess(data: any) {
      setMemos(data);
    },
    // watch: true,
  });

  // Listening to the New Memo event
  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: ensRegistryABI,
    eventName: 'NewMemo',
    listener: (event: [string, any, string, string]) => {
      onNewMemo(...event);
    },
  });

  return (
    <div className="grid gap-4">
      {memos.length > 0 &&
        memos?.map((memo: any) => {
          return (
            <div key={memo} className="rounded bg-slate-100">
              <p className="p-4">{memo.message}</p>

              <h1 className="bg-slate-200 p-4 py-2">
                From: {memo.name} at{' '}
                {new Date(+memo.timestamp?.toString()).toUTCString()}
              </h1>
            </div>
          );
        })}
    </div>
  );
}
