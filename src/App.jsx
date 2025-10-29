import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ComicPage from "./pages/ComicPage";
import ChapterPage from "./pages/ChapterPage";
import ProfilePage from "./pages/ProfilePage";

// Uploader components
import UploaderLayout from "./uploader/UploaderLayout";
import UploaderDashboard from "./uploader/UploaderDashboard";
import MyComic from "./uploader/MyComic";
import NewComicForm from "./uploader/NewComicForm";
import EditComicForm from "./uploader/EditComicForm";
import UploadChapter from "./uploader/UploadChapter";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho trang chủ với layout */}
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />

        {/* Route cho trang login không có layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route cho trang register không có layout */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Route cho trang profile với layout */}
        <Route path="/profile" element={
          <Layout>
            <ProfilePage />
          </Layout>
        } />

        {/* Route cho trang comic chi tiết với layout */}
        <Route path="/comic/:id" element={
          <Layout>
            <ComicPage />
          </Layout>
        } />

        {/* Route cho trang đọc chapter với layout */}
        <Route path="/comic/:comicId/chapter/:chapterId" element={
          <Layout>
            <ChapterPage />
          </Layout>
        } />

        {/* Uploader Routes */}
        <Route path="/uploader" element={<UploaderLayout />}>
          <Route index element={<UploaderDashboard />} />
          <Route path="my-comics" element={<MyComic />} />
          <Route path="new-comic" element={<NewComicForm />} />
          <Route path="edit-comic/:id" element={<EditComicForm />} />
          <Route path="upload-chapter/:comicId" element={<UploadChapter />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
