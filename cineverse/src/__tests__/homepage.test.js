// src/__tests__/HomePage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../pages/home';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../auth/auth';

// Mocking child components to isolate the test to HomePage
jest.mock('../components/navBar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../components/footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../components/listing', () => () => <div data-testid="listing">Listing</div>);
jest.mock('../components/mainMovieDetails', () => () => <div data-testid="main-movie">MainMovie</div>);

test('renders HomePage with all main components', () => {
  render(
    <Router>
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </Router>
  );

  // Check if Navbar is rendered
  expect(screen.getByTestId('navbar')).toBeInTheDocument();

  // Check if MainMovie is rendered
  expect(screen.getByTestId('main-movie')).toBeInTheDocument();

  // Check if Listing is rendered
  expect(screen.getByTestId('listing')).toBeInTheDocument();

  // Check if Footer is rendered
  expect(screen.getByTestId('footer')).toBeInTheDocument();
});
