import { revalidatePath } from 'next/cache'
import { useRef } from 'react'

const todos: string[] = ['Learning routing here']

export default function Home() {
  async function addTodo(data: FormData) {
    'use server'

    const todo = data.get('todo') as string
    todos.push(todo)

    revalidatePath('/')
  }

  return (
    <main className="p-24">
      <h1 className="text-4xl font-bold">TODOS</h1>
      <form className="flex gap-4" action={addTodo}>
        <input
          type="text"
          name="todo"
          placeholder="I need to..."
          className="mt-4 w-full rounded-md border border-gray-300 p-2 text-black"
        />
        <button
          type="submit"
          className="mt-4 w-48 rounded-md bg-blue-500 p-2 text-white"
        >
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </main>
  )
}
