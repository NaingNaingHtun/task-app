import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import "./App.css";
import Column from "./Column";
import initialData from "./initial-data";

const Container = styled.div`
  display: flex;
`;
function App() {
  const [state, setState] = useState(initialData);
  const onDragStart = (start) => {
    const homeIndex = state.columnOrders.indexOf(start.source.droppableId);
    setState({
      ...state,
      homeIndex,
    });
  };
  const onDragEnd = (result) => {
    setState({
      ...state,
      homeIndex: null,
    });
    // console.log("on drag end");
    // TODO: handle drag events
    // document.body.style.color = "inherit";
    const { source, destination, draggableId } = result;
    // console.log(destination);

    if (!destination) {
      // no destination, no need to do anything
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      // console.log("finished here.");
      return;
    } //user placed the content in the same place,then we need to do nothing

    //reordering state
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); //removing the task
      newTaskIds.splice(destination.index, 0, draggableId); //adding the dragged item to the destination

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      console.log(newColumn.taskIds);
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    //moving from one column to another
    //first remove the dragged item from the source and add it to the destination
    const startTaskIds = Array.from(start.taskIds);
    const finishTaskIds = Array.from(finish.taskIds);

    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setState({
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId="all-columns">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {state.columnOrders.map((column, index) => {
              const isDropDisabled = index < state.homeIndex;
              return (
                <Column
                  column={state.columns[column]}
                  key={column}
                  isDropDisabled={isDropDisabled}
                  index={index}
                />
              );
            })}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
