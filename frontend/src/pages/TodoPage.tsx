import React from 'react';
import { useQuery } from 'react-query';
import StatusSection from '../components/StatusSection';
import apiInstance from '../utils/ApiInstance';

const fetchTodos = async ({ searching }: {  searching: string }) => {
    const response = await apiInstance.get(`/todos/${searching && `?search=${searching}`} `);

    if (response.status !== 200) {
        throw new Error('Network response was not ok');
    }
   
    return response?.data;
};



interface TodoPageProps {
    filterTerm: string;
}

const TodoPage: React.FC<TodoPageProps> = ({ filterTerm }) => {

  
    const { data: todos, error, isLoading } = useQuery<{  
          id: number; 
          title: string; 
          description: string,
          deadline:Date,
          status:string }[], 
          Error>(['todos', filterTerm], ()=>fetchTodos({ searching:filterTerm}));

         

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching todos: {error?.message}</div>;

    return (
        <div className="p-4">
            
            <h2 className="text-xl font-bold mb-4 text-teal-800 ">My Tasks</h2>
           
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