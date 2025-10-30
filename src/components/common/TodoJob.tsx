import React, { useState } from 'react';
import { DeleteIcon, Pencil, Save } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import type { ITodo } from '@/interfaces/todo';
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from '@/redux/api';
import { toast } from 'sonner';
interface Props {
  todo: ITodo;
}

const TodoJob: React.FC<Props> = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState<string>(todo.title);
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [addTodo] = useAddTodoMutation();

  const markTodoAsComplete = async (id: string) => {
    if (todo.completed) return;
    try {
      await updateTodo({ id, completed: true }).unwrap();
      toast.success('Marked complete');
    } catch {
      toast.error('Failed to mark complete');
    }
  };

  const saveEdit = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      toast.error('Title cannot be empty');
      return;
    }
    try {
      await updateTodo({
        id: todo.id,
        title: trimmed,
        completed: todo.completed,
      }).unwrap();
      setIsEdit(false);
      toast.success('Todo updated successfully');
    } catch {
      toast.error('Failed to update todo');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id).unwrap();
      toast('Todo deleted', {
        description: 'Deleted successfully',
        action: {
          label: 'Undo',
          onClick: async () => {
            try {
              await addTodo({
                title: todo.title,
                completed: todo.completed,
              }).unwrap();
            } catch {
              toast.error('Failed to undo');
            }
          },
        },
      });
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="flex border-b-2 justify-between p-2">
      <div className="flex items-center gap-2">
        <Checkbox
          onClick={() => markTodoAsComplete(todo.id)}
          checked={!!todo.completed}
        />

        {!isEdit ? (
          <h3
            className={`font-semibold capitalize ${
              todo.completed ? 'line-through' : ''
            }`}
            aria-label={`Todo: ${todo.title}`}
          >
            {todo.title}
          </h3>
        ) : (
          <input
            className="bg-transparent outline-none font-light"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Edit todo title"
            autoFocus
          />
        )}
      </div>

      {!todo.completed && (
        <div className="flex gap-2 items-center">
          {isEdit ? (
            <Save size={20} cursor="pointer" onClick={saveEdit} />
          ) : (
            <>
              <Pencil
                size={20}
                cursor="pointer"
                onClick={() => setIsEdit(true)}
              />
              <DeleteIcon size={20} cursor="pointer" onClick={handleDelete} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(TodoJob);
