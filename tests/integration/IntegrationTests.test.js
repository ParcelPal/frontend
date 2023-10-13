// LoginForm.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from '../../LoginForm';

describe('LoginForm Integration Test', () => {
  it('calls onLogin with valid credentials', () => {
    // Mock the onLogin function
    const onLoginMock = jest.fn();

    // Render the LoginForm with the mock function
    const { getByPlaceholderText, getByText } = render(
      <LoginForm onLogin={onLoginMock} />
    );

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'user' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'pass' } });

    // Simulate a button press to trigger handleLogin
    fireEvent.click(getByText('Login'));

    // Expect the onLogin function to be called
    expect(onLoginMock).toHaveBeenCalledTimes(1);
  });

  it('displays an error message with invalid credentials', () => {
    // Mock the onLogin function
    const onLoginMock = jest.fn();

    // Render the LoginForm with the mock function
    const { getByPlaceholderText, getByText, getByText: getByTextError } = render(
      <LoginForm onLogin={onLoginMock} />
    );

    // Simulate user input with incorrect credentials
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'invalidUser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'wrongPass' } });

    // Simulate a button press to trigger handleLogin
    fireEvent.click(getByText('Login'));

    // Expect an error message to be displayed
    expect(getByTextError('Invalid username or password')).toBeTruthy();
  });
});
