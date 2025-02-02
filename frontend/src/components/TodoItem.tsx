import React from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

interface TodoItemProps {
   todo:{
    id: number; 
    title: string; 
    description: string, 
    deadline:Date, 
    status:string};
    // onToggle: (id: number) => void;
    // onDelete: (id: number) => void;
}

const deleteTodo = async (id: number) => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL_LOCAL}/todos/${id}`);
    return response.data;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo
 }) => {
 
    const queryClient = useQueryClient();
    const { mutate: deleteTodoMutation } = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    const handleDelete = () => {
        deleteTodoMutation(todo.id);
    };

    return (
        <div className="w-80 flex items-center justify-between p-4 border border-gray-200 rounded-md shadow-sm mb-4">
          
            <div className="flex flex-col gap-2">
              
                <p className="font-medium">{todo.title}</p>
                <p className='text-sm '>{todo.description}</p>
                <p className='text-sm '>{todo.deadline.toDateString()}</p>
              
            </div>
            
            <button onClick={handleDelete} className="text-red-500">
                Delete
            </button>
        </div>
    );
};

export default TodoItem;