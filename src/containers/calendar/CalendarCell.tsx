import React from 'react';
import { Box, Text } from 'theme-ui';
import { GlobalContext, ACTIONS } from '../../_contexts';

import { getCellColor } from '../../_helpers';


const sxCalendarCell = {
  border: '1px solid',
  borderStyle: 'inset',
  fontWeight: 'bold',
  padding: [2],
}

const sxEvents = {
  '.event' : {
    width: '100%',
    color: 'white',
    fontSize: [1],
    my: ['1px'],

    '&.color-green': {
      bg: 'green',
      '&:hover': {
        bg: 'red',
      }
    },
    '&.color-yellow': {
      bg: 'yellow',
      color: 'blue',
      '&:hover': {
        bg: 'red',
      }
    },
    '&.color-red': {
      bg: 'red',
      color: 'white',
      '&:hover': {
        bg: 'white',
        color: 'black',
      }
    },
    '&.color-blue': {
      bg: 'blue',
      '&:hover': {
        bg: 'red',
      }
    }
  }
}
interface CalendarCellProps {
  idx: number;
  dayNumber: number;
  handleClick?: (dayNumber:number) => void;
  currentMonth?: number;
  currentYear?: number;
  events: iModalEventData[];
  currentMonthYearDate: string;
}

const CalendarCell = (
  { idx = 0,
    dayNumber = 0,
    handleClick = () => { },
    events = [],
    currentMonthYearDate,
  }: CalendarCellProps): React.ReactElement => {
  const [, dispatch] = React.useContext(GlobalContext) as [iGlobalState, React.Dispatch<iActionProps>];

  const handleEventClick = (clickEvent:React.MouseEvent, eventData:iModalEventData) => {
    clickEvent.stopPropagation();

    // triggers event Edit
    dispatch({
      payload: {
        ...eventData,
        eventDay: dayNumber,
        eventFullDate: `${dayNumber}/${currentMonthYearDate}`
      },
      type: ACTIONS.EDIT_EVENT,
    });
  }

  const DayEvents = events.map((eventData, idx) => (
    <div key={idx} className={`event color-${eventData.color}`} onClick={(clickEvent) => handleEventClick(clickEvent, eventData)} >
      <span>{eventData.eventTime}</span>
    </div>
  ));


  return (
    <Box
      onClick={() => dayNumber ? handleClick(dayNumber): ()=>{}}
      sx={sxCalendarCell}
      className={`calendar-cell ${!dayNumber ? 'emtpy-cell' : ''}`}
      data-testid={`calendar-cell-day-${dayNumber}`}
    >
      { dayNumber ?
        (
          <React.Fragment>
            <Text sx={{ color: getCellColor({ idx, dayNumber }) }} id={`calendar-day-${dayNumber}`} data-testid={`calendar-day-${dayNumber}`}>
              {dayNumber}
            </Text>
            <Box sx={sxEvents}>
              {DayEvents}
            </Box>
          </React.Fragment>
        ) : null
      }
    </Box>
  )
}

export default CalendarCell;
