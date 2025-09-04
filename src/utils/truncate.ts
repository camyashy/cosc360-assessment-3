/*
To Use
export truncate from '../utils/truncate';

{truncate(content, 100)}

*/


export default function truncate(text: string | undefined, limit: number): string {
    if (text == undefined) {
        return "No content";
    }

    if (text.length <= limit) {
        return text;
    }

    return text.slice(0, limit) + "...";
}


