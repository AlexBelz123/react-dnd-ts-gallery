import React, { FC, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { CardContext } from '../App';
import TextField from './TextField';
import ItemTypes from '../utils/ItemTypes';

interface ColumnProps {
  title: string;
  id: number;
  idx: number;
  children: React.ReactNode;
}

interface IDragCard {
  id: number;
}

const Column: FC<ColumnProps> = ({ title, id, idx, children }) => {
  const { addCard, moveCard } = useContext(CardContext);

  const [, drop] = useDrop<IDragCard>(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => moveCard(item.id, id, idx),
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} className="column">
      <div className="column__title">{title}</div>
      {children}
      <TextField
        handleSubmit={(value) => addCard(id, value)}
        placeholder="Add card..."
      />
    </div>
  );
};

export default Column;
