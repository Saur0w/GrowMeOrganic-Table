import type { ApiResponse } from '../types/index.types.ts';

const API = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number): Promise<ApiResponse> => {
    const response = await fetch(`${API}?page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch artworks');
    }
    return response.json();
};
