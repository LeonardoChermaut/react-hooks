import { useState, useEffect } from 'react';

interface IAxiosConfig {
  axiosInstance: any;
  method: string;
  url?: string;
  requestConfig?: object;
} 

export const useAxios = ({ axiosInstance, method, url, requestConfig = {} }: IAxiosConfig) => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<number>(0);

  const reloadRequest = (): void => setReload(prevReload => prevReload + 1);

  const axiosFetchData = async (signal: any): Promise<void> => {
    try {
      const methodLowerCase = method.toLowerCase();
      const { data: response } = await axiosInstance[methodLowerCase](url, {
        ...requestConfig,
        signal: signal,
      });

      setResponse(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const abortRequestOnFinalData = async (): Promise<any> => {
      const abortController = new AbortController();
      await axiosFetchData(abortController.signal);
      
      return (): void => abortController.abort();
    }

  useEffect(() => {
    abortRequestOnFinalData();
  }, [reload]);

  return {response, error, loading, reloadRequest};
};
