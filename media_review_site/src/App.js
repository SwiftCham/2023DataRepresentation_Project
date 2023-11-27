
import './App.css';

//dependencies
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


//components
import ViewMovieReviews from './components/view-movie-reviews';
import ViewMusicReviews from './components/view-music-reviews';
import AddReviews from './components/add-review';
import EditReview from './components/edit-review';
import DeleteReview from './components/delete-review';


function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar className='navbar'>
          <Container>
            <Navbar.Brand as={Link} to="/">Media Review Site</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/view-music-reviews">Music Reviews</Nav.Link>
              <Nav.Link as={Link} to="/view-movie-reviews">Movie Reviews</Nav.Link>
              <Nav.Link as={Link} to="/add-review">Add a Review</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <div className="App">
          <Routes>
            <Route path="/view-movie-reviews" element={<ViewMovieReviews />} />
            <Route path="/view-music-reviews" element={<ViewMusicReviews />} />
            <Route path="/add-review" element={<AddReviews />} />
            <Route path="/edit-review/:type/:id" element={<EditReview />} />
            <Route path="/delete-review/:type/:id" element={<DeleteReview />} />  
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
