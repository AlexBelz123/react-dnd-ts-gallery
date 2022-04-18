import React, { useContext } from 'react';
import Card from './Card';
import Column from './Column';
import TextField from './TextField';
import { removeJunk } from '../utils/helpers';
import { CardContext } from '../App';

const Board = () => {
  const { columns, cards, addColumn } = useContext(CardContext);

  return (
    <div className="container">
      {columns.map((column, idx) => {
        return (
          <Column key={column.id} id={column.id} title={column.title} idx={idx}>
            {removeJunk(
              column.cardIds.map((cardId) =>
                cards.find((card) => card.id === cardId)
              )
            ).map((card, index) => (
              <Card
                key={card.id}
                card={card}
                //   id={card.id}
                //   columnId={column.id}
                //   columnIndex={index}
                //   title={card.title}
                //   moveCard={moveCard}
              />
            ))}
          </Column>
        );
      })}
      <TextField
        handleSubmit={(value) => addColumn(value)}
        placeholder="Add column..."
      />
    </div>
  );
};

export default Board;
