import React, { useState,useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import apiInstance from '../utils/ApiInstance';
import {jwtDecode} from 'jwt-decode';
import {Todo} from '../types'

interface EditTodoItemProps {
    todo:Todo;
    status: string;
    close: () => void;
}

const editTodo = async (newTodo: { title: string; description: string; deadline: Date, status: string, ownerId: number }) => {
     
    const response = await apiInstance.put(`/todos`, newTodo);
    return response.data;
};



const EditTodoItem: React.FC<EditTodoItemProps>= ({todo,status,close}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                close();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [close]);

    useEffect(() => {
        const today = new Date(todo.deadline).toISOString().split('T')[0];
        setDeadline(today);
        setTitle(todo.title)
        setDescription(todo.description)
      }, [todo]);

   const queryClient = useQueryClient();

   const mutation = useMutation<void, unknown, { title: string; description: string; deadline: Date; status: string, ownerId:number }>({
        mutationFn: editTodo,
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token') as string;
        const decodedToken: { id: number } = jwtDecode(token);

        mutation.mutate({ title, description, deadline: new Date(deadline), status, ownerId: decodedToken.id });
        close();
    };

    return (
        <div  ref={wrapperRef}>
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
                   // pattern="\d{4}-\d{2}-\d{2}"
                />
            </div>
           
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Save
            </button>
        </form>
        </div>
    );
};

export default EditTodoItem;