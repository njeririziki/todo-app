import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface CreateTodoItemProps {
    status: string;
}

const createTodo = async (newTodo: { title: string; description: string; deadline: string,status :string }) => {
     
    const response = await axios.post(`${process.env.REACT_APP_API_URL_LOCAL}/todos`, newTodo);
    return response.data;
};



const CreateTodoItem: React.FC<CreateTodoItemProps>= ({status}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

   const queryClient = useQueryClient();

   const mutation = useMutation<void, unknown, { title: string; description: string; deadline: string; status: string }>({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ title, description, deadline, status });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-600 text-sm  mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600 text-sm  mb-2">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="deadline" className="block text-gray-600 text-sm  mb-2">Deadline</label>
                <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
           
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Save
            </button>
        </form>
    );
};

export default CreateTodoItem;