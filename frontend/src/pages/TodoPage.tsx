import React from 'react';
import { useQuery } from 'react-query';
import TodoItem from '../components/TodoItem';
// import { useAuth0 } from '@auth0/auth0-react';


const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const TodoPage: React.FC = () => {
    const { data: todos, error, isLoading } = useQuery<{ id: number; title: string; completed: boolean }[], Error>('todos', fetchTodos);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching todos: {error?.message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <ul>
                {todos && todos.map((todo: { id: number; title: string; completed: boolean }) => (
                    <TodoItem key={todo.id} todo={todo} onToggle={() => {}} onDelete={() => {}} />
                ))}
            </ul>
        </div>
    );
};

export default TodoPage;