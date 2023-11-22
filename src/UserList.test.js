import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

function renderComponent() {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' },
  ];
  render(<UserList users={users} />);

  return { users };
}

test('render just empty table (getAllByRole)', () => {
  render(<UserList users={[]} />);

  // screen.logTestingPlaygroundURL();
  const tableRows = screen.getAllByRole('row');
  expect(tableRows).toHaveLength(1);
});

test('render just empty table (getByRole)', () => {
  render(<UserList users={[]} />);

  // screen.logTestingPlaygroundURL();
  const nameHeader = screen.getByRole('columnheader', { name: /name/i });
  const emailHeader = screen.getByRole('columnheader', { name: /email/i });

  expect(nameHeader).toBeInTheDocument();
  expect(emailHeader).toBeInTheDocument();
});

test('render one row per user (getByRole)', () => {
  // const users = [
  //   { name: 'jane', email: 'jane@jane.com' },
  //   { name: 'sam', email: 'sam@sam.com' },
  // ];
  // render(<UserList users={users} />);
  renderComponent();

  // screen.logTestingPlaygroundURL();
  const tableRows = screen.getAllByRole('row');

  expect(tableRows).toHaveLength(3);
});

test('render one row per user (get element by row)', () => {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' },
  ];
  render(<UserList users={users} />);
  const janeRow = screen.getByRole('row', { name: /jane jane@jane\.com/i });
  const samRow = screen.getByRole('row', { name: /sam sam@sam\.com/i });

  expect(janeRow).toBeInTheDocument();
  expect(samRow).toBeInTheDocument();
});

test('render one row per user (data-testid="users" and within)', () => {
  // const users = [
  //   { name: 'jane', email: 'jane@jane.com' },
  //   { name: 'sam', email: 'sam@sam.com' },
  // ];
  // render(<UserList users={users} />);
  renderComponent();

  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  expect(rows).toHaveLength(2);
});

test('render one row per user (by returning container from render)', () => {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' },
  ];
  const { container } = render(<UserList users={users} />);

  // eslint-disable-next-line
  const rows = container.querySelectorAll('tbody tr');

  expect(rows).toHaveLength(2);
});

test('render the email and name of each user (toHaveTextContent)', () => {
  // const users = [
  //   { name: 'jane', email: 'jane@jane.com' },
  //   { name: 'sam', email: 'sam@sam.com' },
  // ];
  // render(<UserList users={users} />);
  const { users } = renderComponent();

  users.forEach((user) => {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toHaveTextContent(user.name);
    expect(email).toHaveTextContent(user.email);
  });
});

test('render the email and name of each user (toBeInTheDocument)', () => {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' },
  ];
  render(<UserList users={users} />);

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
