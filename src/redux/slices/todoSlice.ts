import type { ITodo } from '@/interfaces/todo';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [] as ITodo[],
  },
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index === -1) return;
      state.todos[index] = { ...state.todos[index], ...action.payload };
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      // assign filtered array back to state (immer handles mutation)
      state.todos = state.todos.filter(
        (todo: ITodo) => todo.id !== action.payload
      );
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex(
        (todo: ITodo) => todo.id === action.payload
      );
      if (index === -1) return;
      const [completedTodo] = state.todos.splice(index, 1);
      completedTodo.completed = !completedTodo.completed;
      state.todos.push(completedTodo);
      // mark completed; keep ordering stable
      // state.todos[index].completed = !state.todos[index].completed;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, completeTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
