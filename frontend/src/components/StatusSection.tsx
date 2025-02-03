import React, { useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodoItem from "./CreateTodoItem";
import plusIcon  from '../assets/plus.svg';

interface StatusSectionProps {
    title: string;
    todos: { 
          id: number; 
          title: string; 
          description: string,
          deadline:Date,
          status:string
         }[];
}

const StatusSection: React.FC<StatusSectionProps> = ({title, todos }) => {
    const [createTodo, setCreateTodo] =  useState(false);

    return (
        <div className="w-88 ">
            <h6 className="text-lg font-semibold mb-4 subpixel-antialiased">
            {title.charAt(0).toUpperCase() + title.slice(1)}
            </h6>
            {createTodo? <CreateTodoItem status={title} close={()=>setCreateTodo(false)} />
            :
            <div>
            <ul className="w-full ">
                {todos && todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo}  />
                ))}
            </ul>
            <div 
            onClick={()=> setCreateTodo(true)}
            className="w-80 bg-gray-100 hover:bg-gray-200 text-black flex gap-2 justify-center items-center py-2 px-4 rounded-md mt-4">
               <img src={plusIcon} alt="plus" className="w-4 h-4" />
               <p className="font-medium text-sm"
               > 
               Add Todo
              </p>
                </div>
                </div>
    }
            
            </div>
      );
}
 
export default StatusSection;


