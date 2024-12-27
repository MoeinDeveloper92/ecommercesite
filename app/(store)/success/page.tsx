'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import userBasketStore from '@/store/store';

import { TicketCheck } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
const page = () => {
  const { user } = useUser();

  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const clearBasket = userBasketStore((state) => state.clearBasket);
  const sessionId = searchParams.get('session_id');
  useEffect(() => {
    //.once we hit this page we should clear the basket
    //Technically it shoul;d be done on the backledn,, with db is secure
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-lg min-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <TicketCheck color="green" size={'50px'} />
        </div>
        <h1 className="text-center font-bold text-3xl max-w-[300px] mx-auto">
          Thank you For your Order {user?.firstName}!
        </h1>
        <div className="border-t border-b border-gray-200 py-6 mb-6 text-center mt-6">
          <p className="text-lg text-gray-700 mb-5">
            Your Order has been confirmed and will be shipped shortly!!!
          </p>
          <div className="space-y-2">
            {orderNumber && (
              <p className="text-gray-600 flex items-center sapce-x-5">
                <span>Order Number </span>
                <span className="font-mono text-sm text-green-600">
                  {orderNumber}
                </span>
              </p>
            )}
          </div>
        </div>
        {sessionId && (
          <p className="text-gray-600 flex justify-between">
            <span>Transaction ID:</span>
            <span className="font-mono text-sm">{sessionId}</span>
          </p>
        )}
        <div className="space-y-4">
          <p className="text-gray-600">
            A confirmation Email has been sent to your registered email address!
          </p>
          <div className="flex flex-col sm:flex-grow gap-4 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href={'/orders'}>View Order Details</Link>
            </Button>
            <Button asChild variant={'outline'}>
              <Link href={'/'}>Continure Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
