import { useState, useEffect } from 'react'
import { TodoProvider } from './context/TodoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div
        className="min-h-screen py-10 px-4 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
        }}
      >
        <div className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl px-6 py-8 bg-gradient-to-br from-[#1e293b] to-[#334155] border border-[#3b82f6]/30">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-white tracking-wide drop-shadow-xl">
            🚀 Supercharged Todo Manager
          </h1>

          <div className="mb-8">
            <TodoForm />
          </div>

          <div className="flex flex-col gap-4">
            {todos.length === 0 ? (
              <p className="text-center text-gray-300 italic">
                Nothing to do yet... Add your first task! 🎯
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
