import { render, screen, fireEvent } from '@testing-library/react';
import EventDialogue from '../EventDialogue';

describe('Event Dialogue', () => {
  it('should open', () => {
    render(<EventDialogue open={true} />);
    const dialogueTitle = screen.getByText('Teaching Availability');
    expect(dialogueTitle).toBeInTheDocument();
  });

  it('should render times correctly', () => {
    const startDate = new Date('2021-06-20T06:00:00');
    const endDate = new Date('2021-06-20T07:30:00');

    render(<EventDialogue open={true} start={startDate} end={endDate} />);

    const startTimeInput = screen.getByLabelText(/Start Time/i);
    const endTimeInput = screen.getByLabelText(/End Time/i);
    expect(startTimeInput.value).toEqual('06:00 AM');
    expect(endTimeInput.value).toEqual('07:30 AM');
  });

  it('should render description (title prop) correctly', () => {
    const title = 'Foo bar lorem ipsum';
    render(<EventDialogue open={true} title={title} />);
    const descriptionInput = screen.getByLabelText(/Description/i);
    expect(descriptionInput.value).toEqual(title);
  });

  it('should fire submit handler', () => {
    const title = 'Foo bar lorem ipsum';
    const startDate = new Date('2021-06-20T06:00:00');
    const endDate = new Date('2021-06-20T07:30:00');

    const handleSubmit = jest.fn();
    render(
      <EventDialogue
        open={true}
        title={title}
        start={startDate}
        end={endDate}
        handleSubmit={handleSubmit}
      />
    );
    const submitButton = screen.getByText(/^Submit$/i);
    fireEvent.click(submitButton);
    expect(handleSubmit).toBeCalled();
  });
});
