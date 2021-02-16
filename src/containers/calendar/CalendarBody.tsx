import React from 'react';
import { Box } from 'theme-ui';

import { Modal } from '../../components';
import CalendarCell from './CalendarCell';

import { getMonthDays, getEventsByMonth } from '../../_helpers';

import { GlobalContext, ACTIONS } from '../../_contexts';


const sxCalendarBody = {
  border: '1px outset',
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 14%)', // 7 cols
  gridTemplateRows: 'repeat(5, 150px)', // 5 rows
  justifyContent: 'space-evenly',
  'div.calendar-cell': {
    bg: 'white',
  },
  '.calendar-cell:nth-of-type(7n+1), .calendar-cell: nth-of-type(7n)': {
    bg: 'lightgray'
  },
}

interface CalendarBodyProps {
  showMaxCells?: number;
  currentDate: Date;
  currentMonth: string;
}

const CalendarBody = ({ showMaxCells = 35, currentMonth, currentDate }: CalendarBodyProps): React.ReactElement => {
  const CURRENT_YEAR = currentDate.getFullYear();
  const [{modalState} , dispatch] = React.useContext(GlobalContext) as [iGlobalState, React.Dispatch<iActionProps>];
  const monthEvents = getEventsByMonth({ year: CURRENT_YEAR, month: currentMonth });

  const currentMonthYearDate = `${currentMonth}/${CURRENT_YEAR}`;

  const updateModalState = (updatedState: iModalState) => {
    dispatch({
      payload: updatedState,
      type: ACTIONS.UPDATE_MODAL_INFO,
    });
  }

  const handleCellClick = (dayNumber: number): void => {
    updateModalState({
      showModal: true,
      dateConfig: {
        currentMonth,
        currentDate,
        currentDay: dayNumber,
        currentFullDate: `${dayNumber}/${currentMonthYearDate}`
      }
    });
  }

  const calendarDays = () => {
    const Body = [];

    const monthDays = getMonthDays(currentMonth);
    // copy without alter the current date
    const newDate = new Date(currentDate);
    // move to the first day of the month
    newDate.setDate(1);
    // get the weekday
    const firstDayWeekOfTheMonth = newDate.getDay();
    // to keep track of the days of the month
    let currentDay = 0;

    for (let idx = 0; idx < showMaxCells; idx++) {
      if (idx >= firstDayWeekOfTheMonth && idx <= monthDays) {
        currentDay++;
      } else {
        // reset the value to get ignored in <CalendarCell />
        currentDay = 0;
      }

      let dayEvents: iModalEventData[] = [];

      if (currentDay) {
        dayEvents = monthEvents[currentDay];
      }

      Body.push(
        <CalendarCell
          key={idx}
          idx={idx}
          dayNumber={currentDay}
          handleClick={handleCellClick}
          events={dayEvents}
          currentMonthYearDate={currentMonthYearDate}
        />
      )
    }

    return Body;
  }

  return (
    <Box>
      <Box sx={sxCalendarBody}>
        {calendarDays()}
      </Box>
      { modalState.showModal
        ? <Modal setModalState={(value) => updateModalState({ showModal: value })} />
        : null
      }
    </Box>
  )
}

export default CalendarBody;
