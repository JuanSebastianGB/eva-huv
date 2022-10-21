import { AxiosCall } from '@/models';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useFetchAndLoad = () => {
  const [load, setLoad] = useState(false);

  let controller: AbortController;
  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    setLoad(true);
    if (axiosCall.controller) controller = axiosCall.controller;
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
    } catch (error) {
      setLoad(false);
      throw error;
    }
    setLoad(false);
    return result;
  };

  const cancelCall = () => {
    setLoad(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return (): void => cancelCall();
  }, []);

  return { load, callEndpoint };
};
