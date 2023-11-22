import { render, screen } from '@testing-library/react';
import App from './App';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

test('renders learn react link', () => {
  render(<App />);

  // screen.logTestingPlaygroundURL();
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link (getByTestId)', () => {
  render(<App />);
  const header = screen.getByTestId('header');
  expect(header).toBeInTheDocument();
});

test('render userList', () => {
  render(<App />);

  // screen.debug();
  const userList = screen.getByRole('table');
  expect(userList).toBeInTheDocument();
});

test('can receive a new user and show it on a list', () => {
  render(<App />);

  const nameInput = screen.getByRole('textbox', {
    name: /enter name/i,
  });
  const emailInput = screen.getByRole('textbox', {
    name: /enter email/i,
  });
  const button = screen.getByRole('button');

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    user.click(nameInput);
    user.keyboard('jane');
    user.click(emailInput);
    user.keyboard('jane@jane.com');
    user.click(button);
  });

  // screen.debug();
  const name = screen.getByRole('cell', { name: 'jane' });
  const email = screen.getByRole('cell', { name: 'jane@jane.com' });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(name).toHaveTextContent('jane');
  expect(email).toHaveTextContent('jane@jane.com');
});

// test('can receive a new user and show it on a list', () => {
//   render(<App />);

//   // screen.logTestingPlaygroundURL();
//   const inputName = screen.getByRole('textbox', {
//     name: /enter name/i,
//   });
//   const inputEmail = screen.getByRole('textbox', {
//     name: /enter email/i,
//   });
//   const button = screen.getByRole('button', {
//     name: /add user/i,
//   });

//   expect(inputName).toBeInTheDocument();
//   expect(inputEmail).toBeInTheDocument();
//   expect(button).toBeInTheDocument();
// });
