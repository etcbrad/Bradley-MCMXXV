/**
 * == CUSTOMIZATION SECTION ==
 * Add your own default anecdotes to this array. 
 * These will be used the first time the app runs, or after a reset.
 * You can add more anecdotes via the input field in the app.
 */
export const DEFAULT_ANECDOTES: string[] = [];

/**
 * The introductory text that appears once at the beginning.
 */
export const INTRO_TEXT = "Bradley MCMXXV is an organic intelligence system converting thoughts into written words...";

/**
 * The sequence of messages for the fake boot-up process.
 */
export const BOOT_SEQUENCE: string[] = [
    "Initiating thought matrix...",
    "Calibrating neural network...",
    "Accessing memory banks...",
    "Streaming random access thoughts...",
    "The Writer is ready to write.",
    "" // This creates a blank line before anecdotes start
];


/**
 * Adjust the typing simulation parameters here.
 */

// Typing speed in milliseconds. A random value between MIN and MAX is used for each character.
export const TYPING_SPEED_MIN = 30; // Faster typing
export const TYPING_SPEED_MAX = 110; // Slower, more deliberate typing

// The chance (from 0.0 to 1.0) that the 'AI' makes a typo and backspaces.
export const BACKSPACE_PROBABILITY = 0.08; // 8% chance

// Speed of backspacing in milliseconds for typo corrections.
export const BACKSPACE_SPEED = 40;

// Pause in milliseconds after the intro, boot lines, and anecdotes.
export const PAUSE_AFTER_BOOT_LINE_MS = 500; // 0.5 seconds
export const PAUSE_AFTER_ANECDOTE_MS = 1500; // 1.5 seconds