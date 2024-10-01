import { useState, useEffect } from 'react'
import './App.css'
import { TodoProvider } from "./context";
import { TodoFrom, TodoItem } from './components';

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {

    setTodos((prev) => [...prev, { id: Date.now(), ...todo }])
  }
  const updateTodo = (id, todo) => {

    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))

  }
  const deleteTodo = (id) => {
    console.log(id)
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id)
    })
  }


  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }

  }, [])

  // using another useEffect for optimizing, otherwise get todo run everytime when there is change in todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }, [todos])


  const toggleComplete = (id) => {
    setTodos(prev => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  return (

    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
         <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
            <div className="w-[108rem] flex-none flex justify-end">
              <picture>
                <source srcset="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif" type="image/avif" />
                <img src="https://tailwindcss.com/_next/static/media/docs@tinypng.d9e4dcdc.png" alt="" className="w-[71.75rem] flex-none max-w-none dark:hidden" decoding="async" />
              </picture>
              <picture>
                <source srcset="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif" type="image/avif" />
                <img src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png" alt="" className="w-[90rem] flex-none max-w-none hidden dark:block" decoding="async" />
              </picture>
            </div>
          </div>
            <div className="bg-[#172842] min-h-screen py-8">
              
              <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                <div className="mb-4">
                  <TodoFrom />
                </div>
                <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */
                    todos.map((todo) => (
                      <div key={todo.id}
                        className='w-full'
                      >
                        <TodoItem todo={todo} />
                      </div>
                    ))
                  }

                </div>
              </div>
            </div>
          </TodoProvider>
            )
}

            export default App
