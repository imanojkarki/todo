import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ITodo } from '@/interfaces/todo';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api/',
    // credentials: 'include', // enable if using session auth
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => 'todos/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todos' as const, id })),
              { type: 'Todos', id: 'LIST' },
            ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    addTodo: builder.mutation<ITodo, Partial<ITodo>>({
      query: (body) => ({ url: 'todos/', method: 'POST', body }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    updateTodo: builder.mutation<ITodo, Partial<ITodo> & Pick<ITodo, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `todos/${id}/`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Todos', id },
        { type: 'Todos', id: 'LIST' },
      ],
    }),
    deleteTodo: builder.mutation<{ success?: boolean }, string>({
      query: (id) => ({ url: `todos/${id}/`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Todos', id },
        { type: 'Todos', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api;

export default api;
