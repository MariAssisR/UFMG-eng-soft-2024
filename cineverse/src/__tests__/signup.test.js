// src/__tests__/Signup.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../auth/auth';
import SignupPage from '../pages/signup'; // Assumindo que você tem uma página de Signup separada

// Mocking components that might be present on the signup page
jest.mock('../components/navBar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../components/footer', () => () => <div data-testid="footer">Footer</div>);

test('signup a new user', async () => {
  render(
    <Router>
      <AuthProvider>
        <SignupPage /> {/* Assumindo que você tem uma página de Signup separada */}
      </AuthProvider>
    </Router>
  );

  // Simulando o preenchimento do formulário de signup
  fireEvent.change(screen.getByPlaceholderText(/Type your e-mail/i), { target: { value: 'testuser@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Confirm your e-mail/i), { target: { value: 'testuser@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Type your password/i), { target: { value: 'password123' } });

  // Simulando o clique no botão de signup
  fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  // Esperar que o usuário seja redirecionado ou que um elemento específico apareça
  await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument());

  // Verifica se a mensagem de sucesso foi exibida
  expect(window.alert).toHaveBeenCalledWith('User registered successfully!');
});

// Mocking window.alert to test if it was called
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});
