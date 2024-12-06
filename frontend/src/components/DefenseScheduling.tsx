import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Defense {
  id: number;
  name: string;
}

const initialDefenses: Defense[] = [
  { id: 1, name: 'Defense 1' },
  { id: 2, name: 'Defense 2' },
  { id: 3, name: 'Defense 3' },
];

const App: React.FC = () => {
  const [defenses, setDefenses] = useState(initialDefenses);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(defenses);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDefenses(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Defense Name</TableCell>
            </TableRow>
          </TableHead>
          <Droppable droppableId="defenses">
            {(provided: any) => (
              <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                {defenses.map((defense, index) => (
                  <Draggable key={defense.id} draggableId={defense.id.toString()} index={index}>
                    {(provided: any) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TableCell>{defense.name}</TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </TableContainer>
    </DragDropContext>
  );
};

export default App;

