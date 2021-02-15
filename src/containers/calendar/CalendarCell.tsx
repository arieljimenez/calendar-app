import React from 'react';
import { Box, Text } from 'theme-ui';

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
    '&.color-green': {
      bg: 'green',
      color: 'white',
      fontSize: [1],
      my: ['1px'],

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
}

const CalendarCell = ({ idx = 0, dayNumber = 0, handleClick=()=>{}, events=[]}: CalendarCellProps): React.ReactElement => {
  const DayEvents = events.map((event, idx) => (
    <div key={idx} className="event color-green">
      <span>{event.eventTime}</span>
    </div>
  ));

  return (
    <Box
      onClick={() => dayNumber ? handleClick(dayNumber): ()=>{}}
      sx={sxCalendarCell}
      className='calendar-cell'
    >
      { dayNumber ?
        (
          <React.Fragment>
            <Text sx={{ color: getCellColor({ idx, dayNumber }) }}>
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
