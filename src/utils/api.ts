import axios from 'axios';

export interface Comic {
  title: string;
  img: string;
}

export const fetchRandomComic = async (num: number): Promise<Comic> => {
  try {
    const response = await axios.get(`/xkcd/${num}/info.0.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comic:', error);
    throw error;
  }
};
