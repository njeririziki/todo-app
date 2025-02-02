import React from 'react';
import { useQuery } from 'react-query';
import StatusSection from '../components/StatusSection';
// import { useAuth0 } from '@auth0/auth0-react';
//import dotenv from 'dotenv'
import axios from 'axios';




const fetchTodos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL_LOCAL}/todos`);

    if (response.status !== 200) {
        throw new Error('Network response was not ok');
    }
    console.log({fetchTodos: response});   
    return response?.data;
};

const TodoPage: React.FC = () => {
    const { data: todos, error, isLoading } = useQuery<{  
          id: number; 
          title: string; 
          description: string,
          deadline:Date,
          status:string }[], Error>('todos', fetchTodos);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching todos: {error?.message}</div>;

    return (
        <div className="p-4">
            
            <h3 className="text-xl font-bold mb-4 ">My Tasks</h3>
           
            <div  className="flex flex-row gap-12"> 
                { ['todo', 'in progress', 'completed'].map(status => (
                <StatusSection key={status} title={status} todos={todos?.filter(todo => todo.status === status) || []} />

            ))}
            <div></div>
            </div>
        </div>
    );
};

export default TodoPage;