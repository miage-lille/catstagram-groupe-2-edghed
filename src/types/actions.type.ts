import { Picture } from './picture.type';

export type Increment = { type: 'INCREMENT' };
export type Decrement = { type: 'DECREMENT' };

export type SelectPicture = { type: 'SELECT_PICTURE'; picture: Picture };
export type CloseModal = { type: 'CLOSE_MODAL' };

export type FetchCatsRequest = { type: 'FETCH_CATS_REQUEST'; method: 'GET'; path: string };

export type PictureState = 
  | { status: 'loading' }
  | { status: 'success'; data: Picture[] }
  | { status: 'failure'; error: string };

export type FetchCatsCommit = { type: 'FETCH_CATS_COMMIT'; payload: PictureState };
export type FetchCatsRollback = { type: 'FETCH_CATS_ROLLBACK'; error: Error };

export type Actions =
  | Increment
  | Decrement
  | SelectPicture
  | CloseModal
  | FetchCatsRequest
  | FetchCatsCommit
  | FetchCatsRollback;
