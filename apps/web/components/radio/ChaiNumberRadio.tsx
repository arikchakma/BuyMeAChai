import { useState } from 'react';

export default function ChaiNumberRadio() {
  const [chaiNumber, setChaiNumber] = useState<string | number>(1);

  /**
   * @dev Handle the change of the chai number
   * @param e Radio Change Event
   */
  const handleChaiNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set the chai number to the value of the selected radio button
    setChaiNumber(e.target.value);
  };
  return (
    <div>
      {/* Select Chai */}
      <div>
        <input
          type="radio"
          name="chai-number"
          id="chai-number-1"
          value={1}
          defaultChecked
          onChange={handleChaiNumber}
          className="peer hidden"
        />
        <label
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border peer-checked:border-indigo-600"
          htmlFor="chai-number-1"
        >
          1
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="chai-number"
          id="chai-number-3"
          value={3}
          defaultChecked
          onChange={handleChaiNumber}
          className="peer hidden"
        />
        <label
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border peer-checked:border-indigo-600"
          htmlFor="chai-number-3"
        >
          3
        </label>
      </div>
    </div>
  );
}
