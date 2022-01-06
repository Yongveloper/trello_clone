import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atom';

const AddBoardForm = styled.form``;

interface IBoardProps {
  boardName: string;
}

function AddBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IBoardProps>();
  const onSubmit = ({ boardName }: IBoardProps) => {
    setToDos((allToDos) => {
      const newToDos = {
        ...allToDos,
        [boardName]: [],
      };
      window.localStorage.setItem('toDos', JSON.stringify(newToDos));
      return newToDos;
    });
    setValue('boardName', '');
  };
  return (
    <AddBoardForm onSubmit={handleSubmit(onSubmit)}>
      <input {...register('boardName')} type="text" placeholder="Add Board" />
    </AddBoardForm>
  );
}

export default AddBoard;
