// api.ts
import { FetchCatsRequest, FetchCatsCommit, FetchCatsRollback } from './types/actions.type';

export const loading = (): unknown => ({
  status: 'loading',
});

export const success = (payload: { hits: any[] }): unknown => ({
  status: 'success',
  data: payload.hits.map((hit: any) => ({
    previewFormat: hit.previewURL,
    webformatFormat: hit.webformatURL,
    largeFormat: hit.largeImageURL,
    author: hit.user,
  })),
});

export const failure = (error: string): unknown => ({
  status: 'failure',
  error,
});

