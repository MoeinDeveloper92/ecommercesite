'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/sanity.types';
import userBasketStore from '@/store/store';

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}
const AddToBasketButton = ({ product, disabled }: AddToBasketButtonProps) => {
  const { items, removeItem, getItemCount, addItem } = userBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState<boolean>(false);

  //chek to make sure this only renders when we are on the client
  //here we use useEffect to set isClient to tru after component Mounts
  //This ensures that the comoent nonly renders on the client0side
  //Preventing hydration errors due to server/client mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${itemCount === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${itemCount === 0 ? 'text-gray-400' : 'text-gray-600'}`}
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500  hover:bg-blue-600'}`}
        onClick={() => addItem(product)}
        disabled={disabled}
      >
        <span className={'text-xl font-bold text-white'}>+</span>
      </button>
    </div>
  );
};

export default AddToBasketButton;
