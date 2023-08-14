import { ApiInstance } from '../../data/api';
import { useAxios } from '../../hooks/useAxios';

export const Jokes: React.FC = () => {
  const apiInstance = ApiInstance.getInstance().getApi();
  const { response, loading, error, reloadRequest } = useAxios({
    axiosInstance: apiInstance,
    url: '/',
    method: 'GET',
  });

  const handleReloadRequest = (): void => reloadRequest();

  return (
    <article>
      <h1>Jokes</h1>

      {loading && <p>Loading...</p>}
      {!loading && error && <span className="error-message-fetch">Error: {error}</span>}
      {!loading && !error && response && (
        <div>
          <p>{response?.joke}</p>
        </div>
      )}
      <br />
      <button onClick={handleReloadRequest}>Get Data</button>
    </article>
  );
};
