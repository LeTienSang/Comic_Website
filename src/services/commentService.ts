import api from './api'; // axios đã setup

export const getComments = async () => {
    const response = await api.get('/comments/');
    return response.data;
}

export const createComment = async (content) => {
    const response = await api.post('/comments/create/', {
        content: content
    });
    return response.data;
}
