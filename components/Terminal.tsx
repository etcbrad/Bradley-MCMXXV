import React, { useState, useEffect, useRef } from 'react';
import {
    TYPING_SPEED_MIN,
    TYPING_SPEED_MAX,
    BACKSPACE_PROBABILITY,
    BACKSPACE_SPEED,
    PAUSE_AFTER_ANECDOTE_MS,
    PAUSE_AFTER_BOOT_LINE_MS,
    INTRO_TEXT,
    BOOT_SEQUENCE
} from '../constants';

const Cursor: React.FC = () => {
    return (
        <span className="inline-block w-2.5 h-6 bg-green-400 animate-blink align-bottom" aria-hidden="true"></span>
    );
};

interface TerminalProps {
    anecdotes: string[];
}

type TerminalPhase = 'intro' | 'booting' | 'anecdotes';

const Terminal: React.FC<TerminalProps> = ({ anecdotes }) => {
    const [phase, setPhase] = useState<TerminalPhase>('intro');
    const [completedLines, setCompletedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState('');
    
    const [bootIndex, setBootIndex] = useState(0);
    const [anecdoteIndex, setAnecdoteIndex] = useState(0);
    
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Auto-scroll to the bottom
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [completedLines, currentLine]);

    useEffect(() => {
        let timeoutId: number;

        const typeLine = (targetText: string, onComplete: () => void) => {
            // STATE 1: Typing forward
            if (currentLine.length < targetText.length) {
                const shouldMakeTypo = Math.random() < BACKSPACE_PROBABILITY && currentLine.length > 0;
                
                if (shouldMakeTypo) {
                    // Backspace one character to simulate a typo correction
                    timeoutId = window.setTimeout(() => {
                        setCurrentLine(current => current.slice(0, -1));
                    }, BACKSPACE_SPEED);
                } else {
                    // Type the next character with a variable delay
                    const delay = Math.floor(Math.random() * (TYPING_SPEED_MAX - TYPING_SPEED_MIN + 1)) + TYPING_SPEED_MIN;
                    timeoutId = window.setTimeout(() => {
                        setCurrentLine(current => current + targetText.charAt(current.length));
                    }, delay);
                }
            }
            // STATE 2: Finished typing, trigger callback
            else {
                onComplete();
            }
        };
        
        switch (phase) {
            case 'intro':
                typeLine(INTRO_TEXT, () => {
                    timeoutId = window.setTimeout(() => {
                        setCompletedLines(prev => [...prev, INTRO_TEXT, '']);
                        setCurrentLine('');
                        setPhase('booting');
                    }, PAUSE_AFTER_ANECDOTE_MS);
                });
                break;
            
            case 'booting':
                if (bootIndex >= BOOT_SEQUENCE.length) {
                    setPhase('anecdotes');
                    break;
                }
                const bootText = BOOT_SEQUENCE[bootIndex];
                typeLine(bootText, () => {
                    timeoutId = window.setTimeout(() => {
                        setCompletedLines(prev => [...prev, bootText]);
                        setCurrentLine('');
                        setBootIndex(prev => prev + 1);
                    }, PAUSE_AFTER_BOOT_LINE_MS);
                });
                break;
            
            case 'anecdotes':
                // If we've processed all available anecdotes, just wait for more.
                if (anecdoteIndex >= anecdotes.length) {
                    return;
                }
                const targetAnecdote = anecdotes[anecdoteIndex];
                typeLine(targetAnecdote, () => {
                    timeoutId = window.setTimeout(() => {
                        setCompletedLines(prev => [...prev, targetAnecdote, '']);
                        // Move to the next anecdote, don't loop.
                        setAnecdoteIndex(prev => prev + 1);
                        setCurrentLine('');
                    }, PAUSE_AFTER_ANECDOTE_MS);
                });
                break;
        }

        return () => window.clearTimeout(timeoutId);

    }, [phase, currentLine, anecdoteIndex, bootIndex, anecdotes]);

    return (
        <div ref={containerRef} className="h-full overflow-y-auto">
            {completedLines.map((line, index) => (
                <div key={index}>
                    {line && <span className="flex-shrink-0 mr-2">&gt;</span>}
                    <span className="break-words">{line}</span>
                </div>
            ))}
            <div>
                {currentLine && <span className="flex-shrink-0 mr-2">&gt;</span>}
                <span className="break-words">{currentLine}</span>
                <Cursor />
            </div>
        </div>
    );
};

export default Terminal;
