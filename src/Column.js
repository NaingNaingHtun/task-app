import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  width: 30%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  flex-grow: 1;
  padding: 8px;
  transition: background-color 0.2s ease;
  border: ${(props) => (props.isDraggingOver ? "2px solid green" : "")};
  background-color: ${(props) => (props.isDropDisabled ? "red" : "")};
`;
const Column = ({ column, isDropDisabled, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} isDropDisabled={isDropDisabled}>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                isDropDisabled={isDropDisabled}
              >
                {column.taskIds.map((task, index) => (
                  <Task key={task} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
