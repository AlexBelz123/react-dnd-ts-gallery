export interface ICard {
  title: string;
  id: string;
}

export interface IColumn {
  title: string;
  id: string;
  cardIds: string[];
}
