import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ITodo, toDoState } from '../atom';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  /* width: 300px; */
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#dfe6e9'
      : props.isDraggingFromThis
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  input {
    width: 80%;
    padding: 10px;
    border: none;
    border-radius: 3px;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      const newToDos = {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
      window.localStorage.setItem('toDos', JSON.stringify(newToDos));
      return newToDos;
    });
    setValue('toDo', '');
  };
  return (
    <Draggable draggableId={boardId} index={Number(index)}>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.draggableProps}>
          <Title {...magic.dragHandleProps}>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register('toDo', { required: true })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            />
          </Form>
          <Droppable droppableId={boardId} type="card">
            {(magic, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Board;
