import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import AnecdoteInput from './components/AnecdoteInput';
import { DEFAULT_ANECDOTES } from './constants';

const LOCAL_STORAGE_KEY = 'user_anecdotes';

function App() {
  const [anecdotes, setAnecdotes] = useState<string[]>(() => {
    try {
      const storedAnecdotes = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedAnecdotes) {
        return JSON.parse(storedAnecdotes);
      }
    } catch (error) {
      console.error("Error reading anecdotes from localStorage", error);
    }
    return DEFAULT_ANECDOTES;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(anecdotes));
    } catch (error) {
      console.error("Error saving anecdotes to localStorage", error);
    }
  }, [anecdotes]);

  const handleAddAnecdote = (text: string) => {
    setAnecdotes(prevAnecdotes => [...prevAnecdotes, text]);
  };

  return (
    <main className="bg-black text-green-400 font-mono w-screen h-screen p-4 flex flex-col text-lg md:text-xl">
      <div className="flex-grow min-h-0">
        <Terminal anecdotes={anecdotes} />
      </div>
      <AnecdoteInput onAddAnecdote={handleAddAnecdote} />
    </main>
  );
}

export default App;
