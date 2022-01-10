import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atom';
import AddBoard from './Components/AddBoard';
import Board from './Components/Board';
import DeleteArea from './Components/DeleteArea';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        const newToDos = {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
        window.localStorage.setItem('toDos', JSON.stringify(newToDos));
        return newToDos;
      });
    } else if (destination.droppableId === 'delete') {
      // delete toDo
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        const newToDos = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
        window.localStorage.setItem('toDos', JSON.stringify(newToDos));
        return newToDos;
      });
    } else {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        const newToDos = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
        window.localStorage.setItem('toDos', JSON.stringify(newToDos));
        return newToDos;
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddBoard />
        <Droppable droppableId="boards" type="board">
          {(magic) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {/* {magic.placeholder} */}
            </Boards>
          )}
        </Droppable>
        <DeleteArea />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
