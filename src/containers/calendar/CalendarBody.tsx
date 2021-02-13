import React from 'react';
import { Box, Text } from 'theme-ui';


interface getCellColorProps {
  idx: number;
  dayNumber: number;
}

function getCellColor({ idx, dayNumber }: getCellColorProps):string {
  let color = 'black';

  // for the first and last week row, we need to dye other months days
  if ((idx < 6 && dayNumber > 7) || (idx > 27 && dayNumber < 7)) {
    color = 'gray';
  }
  // to know if is a weekend day and ignore if is from another month
  if ((idx % 7 == 0 || idx % 7 === 6) && color !== 'gray'){
    color = 'blue';
  }

  return color;
}



const CalendarCell = ({ idx='00', dayNumber='0', color='black', handleClick}: any): React.ReactElement => (
  <Box
    onClick={() => handleClick(idx)}
  >
    <Text sx={{
      color: getCellColor({idx, dayNumber}),
      fontWeight: 'bold',
    }}>
      {dayNumber}
    </Text>
  </Box>
)

const sxCalendarBody = {
  display: 'grid',
  gridTemplateColumns: '14% 14% 14% 14% 14% 14% 14%',
  justifyContent: 'space-evenly',
  gridTemplateRows: '100px 100px 100px 100px 100px',
}

const CalendarBody = ({ showMaxCells=35}): React.ReactElement => {
  const Body = [];

  for (let idx = 0; idx < showMaxCells; idx++) {
    Body.push(
      <CalendarCell
        key={idx}
        idx={idx}
        dayNumber={idx}
        color={'gray'}
      />
    )
  }

  return (
    <Box sx={sxCalendarBody}>
      {Body}
    </Box>
  )
}

export default CalendarBody;
