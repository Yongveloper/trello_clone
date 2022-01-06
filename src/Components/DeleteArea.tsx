import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Div = styled.div<{ isDraggingOver: boolean }>`
  width: 138px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isDraggingOver ? 'red' : '#ff9ff3')};
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
  span {
    position: absolute;
    font-weight: 600;
  }
`;
function DeleteArea() {
  return (
    <Droppable droppableId="delete">
      {(magic, snapshot) => (
        <Div
          ref={magic.innerRef}
          {...magic.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          <span>Delete Area</span>
          {magic.placeholder}
        </Div>
      )}
    </Droppable>
  );
}

export default DeleteArea;
