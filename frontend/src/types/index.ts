export interface Todo  {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    status: string;
  }

  export interface User {
        id: number;
        username: string;
        email: string;
        password: string;
        todos: Todo[];
        avatar: string;
  }