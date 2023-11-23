import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';
import { act } from 'react-dom/test-utils';

test('it shows two inputs and a button', () => {
  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);

  // screen.logTestingPlaygroundURL();
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('find all elements', () => {
  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);

  const labelName = screen.getByText(/enter name/i);
  const labelEmail = screen.getByText(/enter email/i);
  const inputName = screen.getByRole('textbox', {
    name: /enter name/i,
  });
  const inputEmeil = screen.getByRole('textbox', {
    name: /enter email/i,
  });

  expect(labelName).toBeInTheDocument();
  expect(labelEmail).toBeInTheDocument();
  expect(inputName).toBeInTheDocument();
  expect(inputEmeil).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted (not the best implementation)', () => {
  const argsList = [];
  const callback = (...args) => {
    argsList.push(args);
  };
  render(<UserForm onUserAdd={callback} />);

  const [nameInput, emailInput] = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    user.click(nameInput);
    user.keyboard('jane');

    user.click(emailInput);
    user.keyboard('jane@jane.com');

    user.click(button);
  });

  expect(argsList).toHaveLength(1);
  expect(argsList[0][0]).toEqual({ name: 'jane', email: 'jane@jane.com' });
});

test('it calls onUserAdd when the form is submitted (better implementation)', () => {
  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);

  const [nameInput, emailInput] = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    user.click(nameInput);
    user.keyboard('jannice');

    user.click(emailInput);
    user.keyboard('jannice@gmail.com');

    user.click(button);
  });

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: 'jannice',
    email: 'jannice@gmail.com',
  });
});

test('it calls onUserAdd when the form is submited (get element by label text)', () => {
  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);

  const nameInput = screen.getByRole('textbox', { name: /enter name/i });
  const emailInput = screen.getByRole('textbox', { name: /enter email/i });
  const button = screen.getByRole('button', { name: /add user/i });

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    user.click(nameInput);
    user.keyboard('jannice');

    user.click(emailInput);
    user.keyboard('jannice@gmail.com');

    user.click(button);
  });

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: 'jannice',
    email: 'jannice@gmail.com',
  });
});

test('empties the two inputs when form is submitted', () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole('textbox', { name: /enter name/i });
  const emailInput = screen.getByRole('textbox', { name: /enter email/i });
  const button = screen.getByRole('button', { name: /add user/i });

  // eslint-disable-next-line
  act(() => {
    user.click(nameInput);
    user.keyboard('jannice');
    user.click(emailInput);
    user.keyboard('jannice@gmail.com');
    user.click(button);
  });

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});
