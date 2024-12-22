import React from 'react';

const NotFoundSeachResult = ({ query }: { query: string }) => {
  return (
    <div className="flex items-start justify-center mt-12 min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center">
          No Products Found for : ${query}
        </h1>
        <p className="text-gray-600 text-center">
          Try search with different keywords!!!
        </p>
      </div>
    </div>
  );
};

export default NotFoundSeachResult;
