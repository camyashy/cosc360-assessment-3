import type { User } from "./User";
import type { Category } from "./Category";

export interface Post {
    id: number;
    title: string;
    content?: string;
    user_id: string;
    created_at: string;

    user?: User;
    category: Category;
}