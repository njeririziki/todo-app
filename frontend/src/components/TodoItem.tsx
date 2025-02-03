import React from "react";
import { useMutation, useQueryClient } from "react-query";
import apiInstance from "../utils/ApiInstance";
import deleteIcon from "../assets/trash.svg";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    status: string;
  };
  // onToggle: (id: number) => void;
  // onDelete: (id: number) => void;
}

const deleteTodo = async (id: number) => {
  const response = await apiInstance.delete(`/todos/${id}`);
  return response.data;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteTodoMutation } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleDelete = () => {
    deleteTodoMutation(todo.id);
  };
  const stringifiedDate = new Date(todo.deadline);
  return (
    <div className="w-80 flex items-center bg-white  p-4 border border-gray-200 rounded-md shadow-sm mb-4">
      <div className="flex flex-col  mr-4">
        <p className="text-xl font-semibold text-teal-600 ">
          {stringifiedDate.getDate()}
        </p>
        <p className="text-base font-medium text-teal-800">
          {dayNames[stringifiedDate.getDay()]}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium">{todo.title}</p>
        <p className="text-sm ">{todo.description}</p>
      </div>
      <div className="self-end ml-auto">
        {todo?.status === "todo" && (
          <div
            onClick={handleDelete}
            className="bg-gray-100 hover:bg-gray-00 rounded-md"
          >
            <img
              src={deleteIcon}
              alt="Delete"
              className="text-red-500 w-4 h-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
