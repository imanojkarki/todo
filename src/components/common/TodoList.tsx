import type { ITodo } from '@/interfaces/todo';
import TodoJob from './TodoJob';
import { useGetTodosQuery } from '@/redux/api';

const TodoList = () => {
  const { data: todos = [], isLoading, isError } = useGetTodosQuery();

  if (isLoading) return <div className="py-4">Loading...</div>;
  if (isError) return <div className="py-4">Failed to load todos</div>;
  if (!todos || todos.length === 0)
    return <div className="py-4">No todos yet</div>;

  return (
    <div>
      {todos.map((todo: ITodo) => (
        <TodoJob todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
