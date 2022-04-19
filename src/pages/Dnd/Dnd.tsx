import React, { useState } from 'react';
import _ from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './components/Board';
import { IColumn, ICard } from '../../utils/types';

const defaultCategories = ['TODO', 'Shopping', 'Workout'];

let card_id = 0; // title, id
let column_id = 0; // title, id, cards

const initialCards = Array.from({ length: 9 }).map((_, idx) => ({
  id: ++card_id,
  title: `CARD ${idx}`,
}));

const initialColumns = defaultCategories.map((ctg, idx) => {
  return {
    id: ++column_id,
    title: ctg,
    cardIds: initialCards.slice(idx * 3, idx * 3 + 3).map((card) => card.id),
  };
});

export interface ICardContext {
  cards: ICard[];
  columns: IColumn[];
  addCard: (columnId: number, _title: string) => void;
  addColumn: (_title: string) => void;
  moveCard: (cardId: number, destColumnId: number, index: number) => void;
}

export const CardContext = React.createContext<ICardContext>({
  cards: [],
  columns: [],
  addCard: () => {},
  addColumn: () => {},
  moveCard: () => {},
});

function Dnd() {
  const [cards, setCards] = useState<ICard[]>(initialCards);
  const [columns, setColumns] = useState<IColumn[]>(initialColumns);

  const addCard = (columnId: number, _title: string) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = {
      id: ++card_id,
      title,
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, cardIds: [...column.cardIds, newCard.id] }
          : column
      )
    );
  };

  const addColumn = (_title: string) => {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: ++column_id,
      title,
      cardIds: [],
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const moveCard = (cardId: number, destColumnId: number, index: number) => {
    // take a look at it
    setColumns((prevColumns) => [
      ...prevColumns.map((column) => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          (ids: number[]) =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          (ids: number[]) => ids.filter((id) => id !== cardId)
        )(column.cardIds),
      })),
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <CardContext.Provider
        value={{ cards, columns, addCard, addColumn, moveCard }}
      >
        <Board />
      </CardContext.Provider>
    </DndProvider>
  );
}

export default Dnd;
