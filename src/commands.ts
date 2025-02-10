import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';
import { parseApiResponse } from './api';

const checkStatus = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response;
};
export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () =>
      fetch(action.path, { method: action.method })
        .then(checkStatus)
        .then(response => response.json())
        .then(parseApiResponse), 
    {
      successActionCreator: fetchCatsCommit, 
      failActionCreator: fetchCatsRollback,
    },
  );




