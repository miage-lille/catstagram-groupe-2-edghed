import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';

const checkStatus = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response;
};
export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () => {
      return fetch(action.path, {
        method: action.method,
      })
        .then(checkStatus)
        .then(response => response.json())
        .then(data => {
          console.log("API Response:", data);
          return data;
        })
        .catch(error => {
          console.error("API Error:", error);
          return fetchCatsRollback(error);  // Envoi de l'action en cas d'échec
        });
    },
    {
      successActionCreator: fetchCatsCommit,
      failActionCreator: fetchCatsRollback,
    },
  );

