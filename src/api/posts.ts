import { api } from "./http";
import type { Post } from "../types/Post";
import type { ApiResponse } from "../types/Api";

export const PostsAPI = {

    // List all posts (for post list and dashboard page)
    list: async (): Promise<Post[]> => {
        const response: ApiResponse<Post[]> = await api.get('/');
        return response.data;
    },

    // Get the details of an individual post
    get: async (id: number): Promise<Post> => {
        const response: ApiResponse<Post> = await api.get(`/post/${id}`);
        return response.data;
    },

    // Create a new post
    create: async (data: Pick<Post, "title" | "content" | "category_id">): Promise<Post> => {
        const response: ApiResponse<Post> = await api.post('/post/create', data);
        return response.data;
    },

    // Update an existing post
    update: async (id: number, data: Pick<Post, "title" | "content" | "category_id">): Promise<Post> => {
        const response: ApiResponse<Post> = await api.put(`/post/edit/${id}`, data);
        return response.data;
    },

    // Delete and existing post
    remove: async (id: number): Promise<ApiResponse<string>> => {
        return await api.delete(`/post/delete/${id}`);
    }

};