import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';
import { act } from 'react-dom/test-utils';

test('it shows two inputs and a button', () => {
  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);

  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
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
