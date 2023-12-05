import { render, screen } from '@testing-library/react';
import ColorList from './ColorList';

test('getBy, queryBy, findBy finding 0 elements', async () => {
  render(<ColorList />);

  expect(() => screen.getByRole('textbox')).toThrow();

  expect(screen.queryByRole('textbox')).toEqual(null);

  let errorThrown = false;

  try {
    await screen.findByRole('textbox');
  } catch (error) {
    errorThrown = true;
  }

  expect(errorThrown).toEqual(true);
});

test('getBy, queryBy, findBy when they find 1 element', async () => {
  render(<ColorList />);

  expect(screen.getByRole('list')).toBeInTheDocument();

  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.queryByRole('list')).toBeInTheDocument();
  expect(await screen.findByRole('list')).toBeInTheDocument();
});

test('getBy, queryBy, findBy when finding > 1 elements', async () => {
  render(<ColorList />);

  expect(() => screen.getByRole('listitem')).toThrow();
  expect(() => screen.queryByRole('listitem')).toThrow();

  let errorThrown = false;
  try {
    await screen.findByRole('listitem');
  } catch (error) {
    errorThrown = true;
  }
  expect(errorThrown).toEqual(true);
});

test('getAllBy, queryAllBy, findAllBy', async () => {
  render(<ColorList />);

  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.queryAllByRole('listitem')).toHaveLength(3);
  expect(await screen.findAllByRole('listitem')).toHaveLength(3);
});
