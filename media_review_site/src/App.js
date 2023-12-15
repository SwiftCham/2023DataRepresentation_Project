
import './App.css';

//dependencies
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



//components
import ViewMovieReviews from './components/view-movie-reviews';
import ViewMusicReviews from './components/view-music-reviews';
import AddReviews from './components/add-review';
import EditReview from './components/edit-review';
import DeleteReview from './components/delete-review';
import SearchResults from './components/search-results';
import NavbarWithSearch from './components/navbar';


function App() {

  return (
    <BrowserRouter>
      <>
        <NavbarWithSearch /> {/* calls on navbar */}

        <div className="App">
          <Routes>
            <Route path="/view-movie-reviews" element={<ViewMovieReviews />} />
            <Route path="/view-music-reviews" element={<ViewMusicReviews />} />
            <Route path="/add-review" element={<AddReviews />} />
            <Route path="/edit-review/:type/:id" element={<EditReview />} />
            <Route path="/delete-review/:type/:id" element={<DeleteReview />} />
            <Route path="/search" element={<SearchResults searchQuery={new URLSearchParams(window.location.search).get('query')} />} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
