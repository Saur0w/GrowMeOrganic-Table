import type { Response } from '../types/index.types.ts';

const API = 'https://api.artic.edu/api/v1/artworks';

export const fetchData = async (page: number): Promise<Response> => {
    const response = await fetch(`${API}?page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch the data');
    }
    return response.json();
};
