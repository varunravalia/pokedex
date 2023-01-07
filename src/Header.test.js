import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header/Header.jsx';
describe('Header', () => {
  it('should render successfully', () => {
    render(<Header isRichHeader={false}>this header in non rich format</Header>);
    expect(screen.getByHeader('this header in non rich format')).toBeInTheDocument();
  }),
}