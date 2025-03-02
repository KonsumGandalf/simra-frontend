/**
 * Delays the execution of the next line of code by the specified amount of time.
 * @param ms - number of milliseconds to wait
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
