import { render, screen } from '@testing-library/react';
import AppTitle from '../AppTitle';

describe('AppTitle', () => {
  it('should render the title', () => {
    render(<AppTitle />);
    const titleElement = screen.getByText(/Guide Teaching Availability Calendar/i);
    expect(titleElement).toBeInTheDocument();
  });
});