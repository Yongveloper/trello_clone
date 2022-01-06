import { atom } from 'recoil';

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

let toDos = {
  'To Do': [],
  Doing: [],
  Done: [],
};
const lsToDos = window.localStorage.getItem('toDos');
if (lsToDos) {
  toDos = JSON.parse(lsToDos);
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: toDos,
});
