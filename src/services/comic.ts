import api from './api'; 
export const createComic = async (comicData: any) => {
    const response = await api.post('/comics/create/', comicData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    return response.data;
    }
export const getComics = async () => {
    const response = await api.get('/comics/');
    return response.data;
    }

export const getComicById = async (comicId: number) => {
    const response = await api.get(`/comics/${comicId}/`);
    return response.data;
    }

export const updatedComic = async (comicId: number, comicData: any) => {
    const response = await api.patch(`/comics/${comicId}/update/`, comicData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    return response.data;
    }
export const getTopComic= async () => {
    const response = await api.get('/comics/top/');
    return response.data;
    }
export const getLastestUpdatedComic= async () => {
    const response = await api.get('/comics/latest/');
    return response.data;
    }