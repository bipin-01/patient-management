import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../components/Footer/Footer';

describe('Footer', () => {
  it('should render the Footer component', () => {
    render(<Footer />);

    const copyrightElement = screen.getByText('Copyright © Patient Manager');
    expect(copyrightElement).toBeInTheDocument();
  });
});
