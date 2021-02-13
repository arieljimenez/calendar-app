import React from 'react';
import { Box } from 'theme-ui';

import CalendarHeader from './CalendarHeader';

const sxCalendarContainer = {
  width: [null, null, '600px', '960px'],
  margin: '0 auto',
  pt: [2]
}

const CalendarContainer = (): React.ReactElement => {
  return (
    <Box sx={sxCalendarContainer}>
      <CalendarHeader />

    </Box>
  )
}

export default CalendarContainer;
