'use client';
import React from 'react';
import { useDraftModeEnvironment } from 'next-sanity/hooks';
import { useRouter } from 'next/navigation';

const DisableDraftMode = () => {
  const environemtn = useDraftModeEnvironment();
  const router = useRouter();

  //Only show disblae draftmode button when ourside of presentation tool
  if (environemtn !== 'live' && environemtn !== 'unknown') {
    return null;
  }
  const handleClick = async () => {
    await fetch('/draft-mode/disable');
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-10 bg-gray-50 px-4 py-2 z-50"
    >
      Disable Draft Mode!
    </button>
  );
};

export default DisableDraftMode;
