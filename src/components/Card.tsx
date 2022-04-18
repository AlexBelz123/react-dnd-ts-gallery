import React, { FC } from 'react';
import { ICard } from '../utils/types';

interface CardProps {
  card: ICard;
}

const Card: FC<CardProps> = ({ card }) => {
  return <div className="card">{card.title}</div>;
};

export default Card;
