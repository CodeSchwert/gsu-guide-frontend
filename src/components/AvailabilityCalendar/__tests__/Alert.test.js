import { render, screen } from '@testing-library/react';
import Alert from '../Alert';

describe('Alert', () => {
  it('should render the alert message', () => {
    const alertMessage = 'Something broke, press Alt + F4 to fix it!';

    render(<Alert open={true} alert={alertMessage} />);

    const snackBarElement = screen.getByText(alertMessage);
    expect(snackBarElement).toBeInTheDocument();
    expect(snackBarElement.innerHTML).toEqual(alertMessage);
  });
});