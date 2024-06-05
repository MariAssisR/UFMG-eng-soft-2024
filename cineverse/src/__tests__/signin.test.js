// src/__tests__/signin.test.js

import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SigninPage from '../pages/signin';

test('renders SigninPage component', () => {
  const { getByPlaceholderText, getByText } = render(
    <BrowserRouter>
      <SigninPage />
    </BrowserRouter>
  );

  // Verifica se os campos de e-mail e senha são renderizados
  expect(getByPlaceholderText('Type your e-mail')).toBeInTheDocument();
  expect(getByPlaceholderText('Type your password')).toBeInTheDocument();

  // Verifica se o botão de login é renderizado
  expect(getByText('Sign In')).toBeInTheDocument();
});
