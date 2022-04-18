export interface ICard {
  title: string;
  id: number;
}

export interface IColumn {
  title: string;
  id: number;
  cardIds: number[];
}
