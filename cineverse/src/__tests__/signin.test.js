import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../auth/auth';
import SigninPage from '../pages/signin';

// Mocking components that might be present on the signin page
jest.mock('../components/navBar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../components/footer', () => () => <div data-testid="footer">Footer</div>);

test('renders signin page correctly', () => {
  render(
    <Router>
      <AuthProvider>
        <SigninPage />
      </AuthProvider>
    </Router>
  );

  // Verifica se o título "Cineverse" está presente
  expect(screen.getByText(/Cineverse/i)).toBeInTheDocument();
  
  // Verifica se os campos de email e senha estão presentes
  expect(screen.getByPlaceholderText(/Type your e-mail/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Type your password/i)).toBeInTheDocument();

  // Verifica se o botão de "Sign In" está presente, selecionando pelo índice
  const buttons = screen.getAllByRole('button', { name: /sign in/i });
  expect(buttons[0]).toBeInTheDocument();
});
0