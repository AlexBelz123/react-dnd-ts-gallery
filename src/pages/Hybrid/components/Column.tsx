import React, { FC, useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CardContext } from '../Hybrid';
import TextField from './TextField';

interface ColumnProps {
  title: string;
  id: string;
  idx: number;
  children: React.ReactNode;
}

const Column: FC<ColumnProps> = ({ title, id, idx, children }) => {
  const { addCard } = useContext(CardContext);

  return (
    <Droppable droppableId={id} key={id}>
      {(provided, snapshot) => {
        return (
          <div
            className="column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className="column__title">{title}</div>
            {children}
            {provided.placeholder}
            <TextField
              handleSubmit={(value) => addCard(id, value)}
              placeholder="Add card..."
            />
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
