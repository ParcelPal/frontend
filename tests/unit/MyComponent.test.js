// LoginScreen.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For extended jest-dom matchers
import LoginScreen  from '../../LoginScreen';  
describe('LoginScreen', () => {
  it('calls onLogin with valid credentials', async () => {
    // Mock the onLogin function
    const onLoginMock = jest.fn();

    // Render the LoginScreen with the mock function
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen onLogin={onLoginMock} />
    );

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Username'), {
      target: { value: 'validUser' },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'correctPassword' },
    });

    // Simulate a button click to trigger handleLogin
    fireEvent.click(getByText('Login'));

    // Wait for the async operation (if any) to complete
    await waitFor(() => {});

    // Expect the onLogin function to be called
    expect(onLoginMock).toHaveBeenCalledTimes(1);
  });

  it('displays an error message with invalid credentials', () => {
    // Mock the onLogin function
    const onLoginMock = jest.fn();

    // Render the LoginScreen with the mock function
    const { getByPlaceholderText, getByText, getByText: getByTextError } = render(
      <LoginScreen onLogin={onLoginMock} />
    );

    // Simulate user input with incorrect credentials
    fireEvent.change(getByPlaceholderText('Username'), {
      target: { value: 'invalidUser' },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'wrongPassword' },
    });

    // Simulate a button click to trigger handleLogin
    fireEvent.click(getByText('Login'));

    // Expect an error message to be displayed
    expect(getByTextError('Invalid username or password')).toBeInTheDocument();
  });
});
