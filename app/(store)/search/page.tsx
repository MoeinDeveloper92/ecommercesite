import React from 'react';

//here we have dymanic parameter
//it's a bit different how we create query params
//we do not use useParams here, since we want to leave it as server side component
const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const { query } = await searchParams;
  return <div>SearchPage for {query}</div>;
};

export default SearchPage;
