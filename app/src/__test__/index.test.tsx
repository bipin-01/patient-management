/* eslint-disable testing-library/prefer-find-by */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('should render the App component', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText('Patient Management')).toBeInTheDocument());

    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });
});
