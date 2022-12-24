/* eslint-disable testing-library/prefer-find-by */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

describe('App', () => {
  it('should render the landing page', async () => {
    render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
      </Provider>

    );

    await waitFor(() => expect(screen.getByText((text) => text.includes('Signup'))).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText((text) => text.includes('Welcome to Patient Manager'))).toBeInTheDocument());

  });

  it('should render the login screen', async () => {
    render(
        <Provider store={store}>
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText((text) => text.includes('Login'))).toBeInTheDocument());
  });

  it('should render the profile screen', async () => {
    render(
        <Provider store={store}>
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText((text) => text.includes('Signup'))).toBeInTheDocument());
  });

  it('should render the register screen', async () => {
    render(
        <Provider store={store}>
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
        </Provider>
    );

    await waitFor(() => expect(screen.getByText('Patient Management')).toBeInTheDocument());
  });

//   it('should render the create contact screen', async () => {
//     render(
//       <MemoryRouter initialEntries={['/createcontact']}>
//         <App />
//       </MemoryRouter>
//     );

//     await waitFor(() => expect(screen.getByText('Create Contact')).toBeInTheDocument());
//   });

//   it('should render the single contact screen', async () => {
//     render(
//       <MemoryRouter initialEntries={['/mypatients/1']}>
//         <App />
//       </MemoryRouter>
//     );

//     await waitFor(() => expect(screen.getByText('Single Contacts')).toBeInTheDocument());
//   });

//   it('should render the my contacts screen', async () => {
//     render(
//       <MemoryRouter initialEntries={['/mypatients']}>
//         <App />
//       </MemoryRouter>
//     );

//     await waitFor(() => expect(screen.getByText('My Contacts')).toBeInTheDocument());
//   });
});
