import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();

    if (input !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: input.trim() },
      ]);
    } else {
      alert(`You can't add a Todo without input. 
      Please enter a todo.`);
    }

    setInput("");
  };

  const deleteTodo = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  return (
    <div className='h-full w-screen text-center  bg-cyan-700 font-poppins py-4'>
      <h1 className='pt-8 text-5xl underline font-bold'>Todo App</h1>
      <div className='w-screen mx-auto'>
        <form className='mt-12 mx-auto flex flex-col justify-center gap-6'>
          <input
            type='text'
            className='bg-slate-400 lg:w-[600px] md:w-[300px] mt-4 mx-auto rounded-full py-2 px-4 shadow-sm shadow-slate-800 outline-none'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type='submit'
            onClick={addTodo}
            className='rounded-full bg-slate-600 w-32 p-3 text-xl text-white mx-auto hover:scale-105 duration-500'>
            Add todo
          </button>
        </form>
      </div>

      <h2 className='text-2xl my-6'>List of Todos:</h2>
      <div className='w-fit mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-12 sm:p-0'>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className='rounded-full shadow-sm shadow-slate-800 bg-cyan-700 px-2 mx-2 min-w-[300px]'>
            <p className='text-xl my-4 w-fit mx-auto'>{todo.text}</p>
            <div className='my-2 w-fit mx-auto'>
              <button
                onClick={() => deleteTodo(todo.id)}
                className='rounded-full bg-red-600 shadow-sm shadow-slate-800 px-4 py-2 text-lg hover:scale-105 duration-500'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
