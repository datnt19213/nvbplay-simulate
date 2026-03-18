"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface PointAmountProps {
  amount: number;
  setAmount: (amount: number) => void;
  min?: number;
  max?: number;
}

const PointAmount = ({
  amount,
  setAmount,
  min = 0,
  max = 10000000,
}: PointAmountProps) => {
  const handleIncrement = () => {
    if (amount < max) {
      setAmount(amount + 1);
    }
  };

  const handleDecrement = () => {
    if (amount > min) {
      setAmount(amount - 1);
    }
  };

  return (
    <div className="relative flex h-10 gap-1 rounded-full border border-[#EBEBF0] items-center w-full">
      <Button
        onClick={handleDecrement}
        type="button"
        variant="ghost"
        className="bg-[#EBEBF0] dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-50 border-2 border-gray-50 rounded-full px-6 h-full focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
      >
        <Minus className="size-6 text-gray-900 dark:text-white" />
      </Button>
      <Input
        type="text"
        className="border-none h-full text-center focus-visible:ring-0 focus-visible:ring-offset-0 font-medium"
        placeholder="999"
        value={amount}
        readOnly
        required
      />
      <Button
        onClick={handleIncrement}
        type="button"
        variant="ghost"
        className="bg-[#EBEBF0] dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-50 border-2 border-gray-50 rounded-full px-6 h-full focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
      >
        <Plus className="size-6 text-gray-900 dark:text-white" />
      </Button>
    </div>
  );
};

export default PointAmount;
