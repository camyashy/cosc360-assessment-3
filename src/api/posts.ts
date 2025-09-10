import { api } from "./http";
import type { Post } from "../types/Post";
import type { ApiResponse } from "../types/Api";

export const PostsAPI = {

    list: async (): Promise<Post[]> => {
        const response: ApiResponse<Post[]> = await api.get('/');
        return response.data;
    },

    get: async (id: number): Promise<Post> => {
        const response: ApiResponse<Post> = await api.get(`/post/${id}`);
        return response.data;
    },

    create: async (data: Pick<Post, "title" | "content" | "category_id">): Promise<Post> => {
        const response: ApiResponse<Post> = await api.post('/post/create', data);
        return response.data;
    },

    update: async (id: number, data: Pick<Post, "title" | "content" | "category_id">): Promise<Post> => {
        const response: ApiResponse<Post> = await api.put(`/post/edit/${id}`, data);
        return response.data;
    },

    remove: async (id: number): Promise<ApiResponse<string>> => {
        return await api.delete(`/post/delete/${id}`);
    }

};