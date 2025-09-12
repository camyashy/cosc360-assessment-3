/*
To Use
export truncate from '../utils/truncate';

{truncate(content, 100)}

*/

/**
 * Takes a long string of text and truncates it to a desired length
 * @param text The full length text
 * @param limit The number of characters to truncate to
 * @returns The truncated text
 */
export default function truncate(text: string | undefined, limit: number): string {

    // If no text, return a default message
    if (text == undefined) {
        return "No content";
    }

    // If the text is less than the limit, return the text
    if (text.length <= limit) {
        return text;
    }

    return text.slice(0, limit) + "...";
}


