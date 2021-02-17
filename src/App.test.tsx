import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';

import { getMonth } from './_helpers';


describe('<Calendar />', () => {
  it('it renders current month name on the header', () => {
    const { getByText } = render(<App />);
    const currentMonth = getMonth({date: new Date()});
    const renderedMonth = getByText(currentMonth);
    expect(renderedMonth).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('<Modal />', () => {
    it('should render a modal when a day is clicked', () =>{
      const { getByText, queryByText } = render(<App />);

      let modalElement = queryByText(/New Appointment for/i);
      expect(modalElement).not.toBeInTheDocument();
      expect(modalElement).toBe(null);

      const cellElement = screen.getByTestId('calendar-cell-day-3');
      fireEvent.click(cellElement);

      modalElement = getByText(/New Appointment for/i);
      expect(modalElement).toBeInTheDocument();
    });

    it('should allow add a 30 character max description', () => {
      const { getByLabelText } = render(<App />);

      const cellElement = screen.getByTestId('calendar-cell-day-3');
      fireEvent.click(cellElement);

      const descInput = getByLabelText(/Description/i);
      expect(descInput.maxLength).toBe(30);
    });

    it('should allow to save a event without a city or desc', () => {
      const { getByLabelText, getByText, getAllByText } = render(<App />);

      const cellElement = screen.getByTestId('calendar-cell-day-3');
      fireEvent.click(cellElement);

      const cityInput = getByLabelText(/City/i);
      expect(cityInput.value).toBe('New York'); //by default

      const SaveBtn = getByText(/Save/i);

      fireEvent.click(SaveBtn);
      expect(getAllByText(/Required/i).length).toBe(1); // the desc is missing

      fireEvent.change(cityInput, { target: { value: ''}});
      expect(cityInput.value).toBe('');

      fireEvent.click(SaveBtn);
      expect(getAllByText(/Required/i).length).toBe(2);
    })
  });
});
