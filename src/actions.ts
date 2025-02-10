import { Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment, SelectPicture, CloseModal } from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (counter: number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `https://pixabay.com/api/?key=48663507-9746f23e9de56d435419fb473&per_page=${counter}&q=cat`,
});

// const fetchCatsCommit = (payload: { hits: any[] }): FetchCatsCommit => ({ type: 'FETCH_CATS_COMMIT', payload });
export const fetchCatsCommit = (pictures: Picture[]): FetchCatsCommit => ({
  type: 'FETCH_CATS_COMMIT',
  payload: { status: 'success', data: pictures } 
});




export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });

export const selectPicture = (picture: Picture): SelectPicture => ({ type: 'SELECT_PICTURE', picture });
export const closeModal = (): CloseModal => ({ type: 'CLOSE_MODAL' });
