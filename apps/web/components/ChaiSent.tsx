import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { contractAddress, ensRegistryABI } from '@/utils/contractData';

export default function ChaiSent() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const { address, isConnecting, isDisconnected } = useAccount();

  // Config for the contract write
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: ensRegistryABI,
    functionName: 'buyChai',
    args: [name, message],
    overrides: {
      value: ethers.utils.parseEther('0.001'),
    },
  });

  // Write the contract
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (write && address) {
      write();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky top-5">
      <h1 className="text-2xl font-bold">Buy me a Chai</h1>
      {/* Name */}
      <div className="mt-5 flex flex-col">
        <label htmlFor="name" className="text-xs font-medium uppercase">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Your beautiful name"
          value={name}
          onChange={onNameChange}
          className="mt-1 rounded-sm border px-2 py-1 focus:outline-none active:outline-none"
        />
      </div>
      {/* Message */}
      <div className="mt-5 flex flex-col">
        <label htmlFor="message" className="text-xs font-medium uppercase">
          Message
        </label>
        <input
          type="text"
          id="message"
          placeholder="Say something or nothing ..."
          value={message}
          onChange={onMessageChange}
          className="mt-1 rounded-sm border px-2 py-1 focus:outline-none active:outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={write ? false : true}
        className="mt-4 w-full rounded-sm bg-slate-900 p-2"
      >
        <span className="text-slate-100">
          {isLoading ? 'Loading...' : 'Send'}
        </span>
      </button>
    </form>
  );
}
