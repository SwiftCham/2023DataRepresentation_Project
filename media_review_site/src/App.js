
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


function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar bg="dark" variant="dark">
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
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
