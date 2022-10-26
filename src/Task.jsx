import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import initialData from "./initial-data";

const Container = styled.div`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  margin-bottom: 8px;
  color: ${(props) => (props.isDragging ? "white" : "black")};
  background-color: ${(props) =>
    props.isDragDisabled ? "lightgray" : props.isDragging ? "blue" : "white"};
`;
const Task = ({ task, index }) => {
  const isDragDisabled = task === "task-1";
  return (
    <Draggable draggableId={task} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {initialData.tasks[task].content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
