import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ICard } from '../../../utils/types';

interface CardProps {
  card: ICard;
  idx: number;
}

const Card: FC<CardProps> = ({ card, idx }) => {
  return (
    <Draggable draggableId={card.id.toString()} index={idx} key={card.id}>
      {(provided, snapshot) => {
        return (
          <div
            className="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {card.title};
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
