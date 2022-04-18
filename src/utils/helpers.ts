import { ICard } from './types';
export function removeJunk(arr: (ICard | undefined)[]): ICard[] {
  // fix later
  const temp: ICard[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) temp.push(arr[i] as ICard);
  }

  return temp;
}
