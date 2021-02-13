import React from 'react';
import { Box } from 'theme-ui';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

import { getMonth } from '../../helpers/date';

const sxCalendarContainer = {
  width: [null, null, '600px', '960px'],
  margin: '0 auto',
  pt: [2]
}

const CalendarContainer = (): React.ReactElement => {

  const currentDate = new Date();

  const startingMonth = getMonth({ date: currentDate });

  return (
    <Box sx={sxCalendarContainer}>
      <CalendarHeader monthName={startingMonth} />
      <CalendarBody />
    </Box>
  )
}

export default CalendarContainer;
