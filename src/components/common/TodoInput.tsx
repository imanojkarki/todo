import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAddTodoMutation } from '@/redux/api';
import { toast } from 'sonner';

const InputFile = () => {
  const [value, setValue] = useState('');
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const addTodoData = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = value.trim();
    if (!title) {
      toast.error('Please enter a todo');
      return;
    }
    try {
      await addTodo({ title, completed: false }).unwrap();
      setValue('');
    } catch {
      toast.error('Failed to add todo');
    }
  };

  return (
    <form
      className="flex flex-1 gap-5"
      onSubmit={addTodoData}
      aria-label="Add todo form"
    >
      <Input
        type="text"
        name="todo"
        placeholder="Enter todo ..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="New todo"
      />
      <Button variant="outline" type="submit" disabled={isLoading}>
        Add Todo
      </Button>
    </form>
  );
};

export default InputFile;
