import api from './api'; // axios đã setup

export const getComments = async () => {
    const response = await api.get('/comments/');
    return response.data;
}

export const getCommentByComic = async (comicId) => {
    const response = await api.get(`/comments/comic/${comicId}/`);
    return response.data;
}

export const createComment = async (content, comic_id) => {
    console.log('Creating comment:', content, 'for comic ID:', comic_id);
    const response = await api.post('/comments/create/', {
        content: content,
        comic_id: comic_id
    });
    return response.data;
}
