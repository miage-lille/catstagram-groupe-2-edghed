import { Picture } from './picture.type';

// Dans types/api.type.ts
export type ApiStatus = 
  | { status: "loading" } 
  | { status: "success"; data: Picture[] } 
  | { status: "failure"; error: string };
