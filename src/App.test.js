import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render', () => {
    render(<App />);
    const subTitleElement = screen.getByText('Book your teaching availability.');
    expect(subTitleElement).toBeInTheDocument();
  });
});
