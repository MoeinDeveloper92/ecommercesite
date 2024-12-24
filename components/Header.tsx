'use client';
import {
  ClerkLoaded,
  SignInButton,
  SignedIn,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import React from 'react';
import { TrolleyIcon } from '@sanity/icons';
import { Package } from 'lucide-react';
import { Button } from './ui/button';
import userBasketStore from '@/store/store';

//I need to access to the user
const Header = () => {
  const { user } = useUser();
  const itemCount = userBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const createClerckPassKey = async () => {
    try {
      const response = await user?.createPasskey();
    } catch (error) {
      console.error('Error', JSON.stringify(error, null));
    }
  };
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      {/* Top Row */}
      <div className="flex w-full flex-wrap items-center justify-between">
        <Link
          href={'/'}
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          Berliner
        </Link>
        <Form
          action={'/search'}
          className="w-full  sm:w-auto sm:flex-1  mt-2 sm:mt-0"
        >
          <input
            placeholder="Search for products..."
            className="
            bg-gray-100 
            sm:ml-2
            px-4 
            py-2 
            rounded 
            focus:outline-none 
            focus:ring-2 
            focus:ring-opacity-50 
            border w-full 
            max-w-4xl"
            name="query"
            type="text"
          />
        </Form>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 lg:flex-none">
          <Link
            href={'/basket'}
            className="
            flex-1 
            relative 
            flex 
            justify-center 
            sm:justify-start 
            sm:flex-none
            items-center  
            space-x-2
            bg-blue-500 
            hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span className=" absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
            <span>My Basket</span>
          </Link>
          {/*  User Area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href={'/orders'}
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none itemcenter space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <Package />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button className=" cursor-pointer" asChild>
                  <span>Sign In</span>
                </Button>
              </SignInButton>
            )}
            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerckPassKey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
              >
                generate passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
