import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import { ICard } from '../utils/types';
import ItemTypes from '../utils/ItemTypes';

interface CardProps {
  card: ICard;
}

const Card: FC<CardProps> = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="card">
      {card.title}
    </div>
  );
};

export default Card;
