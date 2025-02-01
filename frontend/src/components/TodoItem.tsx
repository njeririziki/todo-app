import React from 'react';

interface TodoItemProps {
   todo:{id: number;
    title: string;
    completed: boolean};
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({  onToggle,onDelete,todo
 }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="mr-2"
                />
                <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
            </div>
            <button onClick={() => onDelete(todo.id)} className="text-red-500">
                Delete
            </button>
        </div>
    );
};

export default TodoItem;