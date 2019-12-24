import React, { useState, useEffect } from 'react';

export function useLinkage(test: any, test2: any) {

  // console.log(test, 'customHook test', test2)
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    // // function handleStatusChange(status) {
    //   setIsOnline(status.isOnline);
    // }
    return () => {
    };
  });

  return isOnline;
}