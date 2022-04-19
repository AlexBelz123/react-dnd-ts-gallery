import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Card from './Card';
import Column from './Column';
import TextField from './TextField';
import { removeJunk } from '../../../utils/helpers';
import { CardContext } from '../Hybrid';

const Board = () => {
  const { columns, cards, addColumn, moveCard } = useContext(CardContext);

  return (
    <div className="container">
      <DragDropContext onDragEnd={(result) => moveCard(result)}>
        {columns.map((column, idx) => {
          return (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              idx={idx}
            >
              {removeJunk(
                column.cardIds.map((cardId) =>
                  cards.find((card) => card.id === cardId)
                )
              ).map((card, index) => (
                <Card key={card.id} card={card} idx={index} />
              ))}
            </Column>
          );
        })}
        <TextField
          handleSubmit={(value) => addColumn(value)}
          placeholder="Add column..."
        />
      </DragDropContext>
    </div>
  );
};

export default Board;
