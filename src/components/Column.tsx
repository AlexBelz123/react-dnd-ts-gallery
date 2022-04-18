import React, { FC, useContext } from 'react';
import { CardContext } from '../App';
import TextField from './TextField';

interface ColumnProps {
  title: string;
  id: number;
  children: React.ReactNode;
}

const Column: FC<ColumnProps> = ({ title, id, children }) => {
  const { addCard } = useContext(CardContext);

  return (
    <div className="column">
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
