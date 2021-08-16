import { render, screen } from '@testing-library/react';
import Footer from './footer';

test('renders the children within the footer', () => {
  render(<Footer>foo</Footer>);
  expect(screen.getByText('foo')).toBeInTheDocument();
});

test('renders my favorite color text', () => {
  render(<Footer>foo</Footer>);
  expect(screen.getByText('My favorite color is blue')).toBeInTheDocument();
});
