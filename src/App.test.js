import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  // screen.logTestingPlaygroundURL();
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});

test('render userList', () => {
  render(<App />);
  const userList = screen.getByRole('table');
  expect(userList).toBeInTheDocument();
});
