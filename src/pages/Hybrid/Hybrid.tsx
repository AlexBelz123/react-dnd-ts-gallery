import React, { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import _ from 'lodash';
import Board from './components/Board';
import { IColumn, ICard } from '../../utils/types';
import { removeJunk } from '../../utils/helpers';

const defaultCategories = ['TODO', 'Shopping', 'Workout'];

let card_id = 0; // title, id
let column_id = 0; // title, id, cards

const initialCards = Array.from({ length: 9 }).map((_, idx) => ({
  id: ++card_id + '',
  title: `CARD ${idx}`,
}));

const initialColumns = defaultCategories.map((ctg, idx) => {
  return {
    id: ++column_id + '',
    title: ctg,
    cardIds: initialCards.slice(idx * 3, idx * 3 + 3).map((card) => card.id),
  };
});

export interface ICardContext {
  cards: ICard[];
  columns: IColumn[];
  addCard: (columnId: string, _title: string) => void;
  addColumn: (_title: string) => void;
  moveCard: (result: DropResult) => void;
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

  const addCard = (columnId: string, _title: string) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = {
      id: ++card_id + '',
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
      id: ++column_id + '',
      title,
      cardIds: [],
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const moveCard = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    const { index } = destination;

    setColumns((prevColumns) => [
      ...prevColumns.map((column) => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          (ids: string[]) =>
            column.id === destination.droppableId
              ? [...ids.slice(0, index), draggableId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          (ids: string[]) => ids.filter((id) => id !== draggableId)
        )(column.cardIds),
      })),
    ]);

    // const newColumns = columns.map((column) => {
    //   if (column.id === source.droppableId) {
    //     return {
    //       ...column,
    //       cardIds: column.cardIds.filter((id) => id !== draggableId),
    //     };
    //   }

    //   if (column.id === destination.droppableId) {
    //     return {
    //       ...column,
    //       cardIds: [
    //         ...column.cardIds.slice(0, index),
    //         draggableId,
    //         ...column.cardIds.slice(index),
    //       ],
    //     };
    //   }
    //   return column;
    // });

    // setColumns(newColumns);
  };

  return (
    <CardContext.Provider
      value={{ cards, columns, addCard, addColumn, moveCard }}
    >
      <Board />
    </CardContext.Provider>
  );
}

export default Dnd;
