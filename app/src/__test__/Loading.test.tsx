/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../components/Loading';

test('renders a spinner with the specified size', () => {
  const { getByTestId } = render(<Loading size={200} />);
  const spinner = getByTestId('spinner');
  expect(spinner).toHaveStyle('width: 200px');
  expect(spinner).toHaveStyle('height: 200px');
});

test('renders a spinner with a default size of 100 if no size prop is provided', () => {
  const { getByTestId } = render(<Loading />);
  const spinner = getByTestId('spinner');
  expect(spinner).toHaveStyle('width: 100px');
  expect(spinner).toHaveStyle('height: 100px');
});
