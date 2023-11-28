import { render, screen } from '@testing-library/react';
import AccessibleName from './AccessibleName';

test('can select by accessible name', () => {
  render(<AccessibleName />);

  const submitButton = screen.getByRole('button', { name: /submit/i });
  const cancelName = screen.getByRole('button', { name: /cancel/i });

  expect(submitButton).toBeInTheDocument();
  expect(cancelName).toBeInTheDocument();
});
