import React, { useState } from 'react';

interface AnecdoteInputProps {
    onAddAnecdote: (text: string) => void;
}

const AnecdoteInput: React.FC<AnecdoteInputProps> = ({ onAddAnecdote }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onAddAnecdote(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center mt-4 flex-shrink-0">
            <label htmlFor="anecdote-input" className="flex-shrink-0 mr-2" aria-label="Command input prompt">&gt;</label>
            <input
                id="anecdote-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent text-green-400 font-mono w-full focus:outline-none placeholder-green-700"
                placeholder="Type here and press Enter..."
                autoFocus
                autoComplete="off"
            />
        </form>
    );
};

export default AnecdoteInput;
