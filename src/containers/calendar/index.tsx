import React from 'react';
import { Box } from 'theme-ui';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

import { getMonth } from '../../helpers';

const sxCalendarContainer = {
  width: [null, null, '600px', '960px'],
  margin: '0 auto',
  pt: [2]
}

const CalendarContainer = (): React.ReactElement => {
  const currentDate = new Date();
  const currentMonth = getMonth({ date: currentDate });

  return (
    <Box sx={sxCalendarContainer}>
      <CalendarHeader monthName={currentMonth} />
      <CalendarBody currentMonth={currentMonth} currentDate={currentDate} />
    </Box>
  )
}

export default CalendarContainer;
