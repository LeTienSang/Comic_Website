import api from './api'; 
export const createChapter = async (comicId, chapterData) => {
  const formData = new FormData();

  formData.append("number", chapterData.chapterNumber);
  formData.append("title", chapterData.chapterTitle);
  formData.append("content", chapterData.content || "");

  if (chapterData.image) {
    formData.append("image", chapterData.image);
  }

  try {
    const response = await api.post(
      `comics/${comicId}/chapters/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // Nếu có auth token thì thêm dòng này:
          // "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating chapter:", error.response?.data || error.message);
    throw error;
  }
};

export const getChaptersByComic = async (comicId) => {
    const response = await api.get(`/comics/${comicId}/chapters/`);
    return response.data;
  };
  export const getChapterDetail = async (comicId, chapterId) => {
    const response = await api.get(`/${comicId}/${chapterId}/`);
    return response.data;
  };