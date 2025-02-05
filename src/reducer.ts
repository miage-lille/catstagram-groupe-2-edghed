import { Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions, PictureState } from './types/actions.type';
import { fetchCatsRequest } from './actions';
import { cmdFetch } from './commands';
import fakeData from './fake-datas.json';
import { ApiStatus } from './types/api.type';

export type Picture = {
  previewFormat: string;
  webFormat: string;
  author: string;
  largeFormat: string;
};

export type State = {
  counter: number;
  picturesStatus: ApiStatus;  
  selectedPicture: Picture | null;
};

export const defaultState: State = {
  counter: 0,
  picturesStatus: { status: 'loading' },  
  selectedPicture: null,
};
const initialState: State = { 
  counter: 0, 
  picturesStatus: { status: 'loading' }, // pas de 'data' ici
  selectedPicture: null 
};
export const reducer = (state: State | undefined = defaultState, action: Actions): State | Loop<State> => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementState = { ...state, counter: state.counter + 1 };
      return loop(
        incrementState,
        cmdFetch(fetchCatsRequest(incrementState.counter))
      );
    case 'DECREMENT':
      if (state.counter > 3) {
        const decrementState = { ...state, counter: state.counter - 1 };
        return loop(
          decrementState,
          cmdFetch(fetchCatsRequest(decrementState.counter))
        );
      } else {
        return state;
      }
    case 'FETCH_CATS_REQUEST':
      return { ...state, picturesStatus: { status: 'loading' } };
        case 'FETCH_CATS_COMMIT':
          // On vérifie ici que l'action contient bien des données avant de les assigner
          return { 
            ...state, 
            picturesStatus: { 
              status: 'success', 
              data: action.payload.data || []  // S'assurer que `data` existe sinon assigner un tableau vide
            }
          };
        case 'FETCH_CATS_ROLLBACK':
          return { 
            ...state, 
            picturesStatus: { 
              status: 'failure', 
              error: action.error.message 
            } 
          };
    case 'SELECT_PICTURE':
      return { ...state, selectedPicture: action.picture };
    case 'CLOSE_MODAL':
      return { ...state, selectedPicture: null };
    default:
      return state;
  }
};



export const counterSelector = (state: State) => state.counter;
export const picturesSelector = (state: State) => state.picturesStatus;
export const selectedPictureSelector = (state: State) => state.selectedPicture;

export default compose(liftState, reducer);
