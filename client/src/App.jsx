import React from 'react';
import FrontPage from './Pages/FrontPage';
import Signup from './Pages/Signup';
import Signin from './Pages/Singin';
import Dashboared from './Pages/Dashboared';
import UploadImage from './components/UploadImage';
import AlbumsPage from './components/AlbumsPage';
import CreateAlbum from './components/CreateAlbum';
import ViewImage from './components/ViewImage';
import ImagesPage from './components/ImagesPage';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboared />}>
          <Route path='images' element={<ImagesPage/>}/>
          <Route path='albums' element={<AlbumsPage />} />
        </Route>
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/albums/create" element={<CreateAlbum />} />
        <Route path="/view/:id" element={<ViewImage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
