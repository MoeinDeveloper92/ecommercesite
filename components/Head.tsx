import Form from 'next/form';
import React from 'react';

const Head = () => {
  return (
    <header className="w-full px-2 py-5 flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex- justify-between items-center">
          <div className="flex-1 flex justify-start items-center">
            <div>HI</div>
            <div>
              <Form action={'/search'}>
                <input type="text" name="query" />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Head;
