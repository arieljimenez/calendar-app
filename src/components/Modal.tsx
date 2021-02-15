import React from 'react';
import { Box } from 'theme-ui';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import { saveEventLocalStore } from '../_helpers';

const sxModal = {
  bg: 'white',
  border: '2px solid #000',
  boxShadow: 'large',
  mx: [ '10px', '20%', '30%', '40%'],
  pb: [2],
  position: 'absolute',
  pt: [4],
  px: [3],
  top: ['30%'],
  width: ['95%', '400px'],
  '.title': {
    mb: [2]
  },
  '.modal-description': {
    my: 2
  },
  '.time-and-city': {
    display: 'flex',
    mt: [2],
    justifyContent: 'space-between',
  },
  '.modal-btns': {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: [2],
  }
}

const DEFAULT_EVENT_DATA:iModalEventData = {
  eventDesc: '',
  eventCity: 'New York',
  eventTime: '09:00', // AM
}

interface AppModalProps {
  modalState: iModalState;
  setModalState: (state:boolean) => void;
}

const AppModal = ({ modalState, setModalState = () => {} }: AppModalProps): React.ReactElement =>  {
  const { showModal, dateConfig:{ currentFullDate, currentDate, currentMonth, currentDay } } = modalState;
  const [eventData, setEventData] = React.useState<iModalEventData>({
    ...DEFAULT_EVENT_DATA,
  });

  const handleClose = () => {
    setModalState(false);
  };

  const handleEventData = (updatedState:object):void => {
    setEventData({
      ...eventData,
      ...updatedState,
    })
  }

  const handleSaveAppointment = () => {
    const currentYear = currentDate.getFullYear();
    // save event
    saveEventLocalStore({
      dateInfo: {
        year: currentYear,
        month: currentMonth,
        day: currentDay,
      },
      eventData,
    });
    // closeModal
    setModalState(false);
    // reset event data
    handleEventData({ ...DEFAULT_EVENT_DATA });
    // show a snackBar/feedback
  }

  const body = (
    <Fade in={showModal}>
      <Box className="modal-body-container" sx={sxModal}>
        <h2 className="title">New Appointment for {currentFullDate}</h2>
        <form>
          <div className="time-and-city">
            <TextField
              id="time"
              label="Time"
              type="time"
              defaultValue="09:00"
              className="time"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={(e) => handleEventData({ eventTime: e.currentTarget.value })}
            />
            <TextField
              id="city"
              label="City"
              type="text"
              defaultValue="New York"
              className="city"
              onChange={(e) => handleEventData({ eventCity: e.currentTarget.value })}
            />
          </div>
          <FormControl fullWidth className="modal-description">
            <InputLabel htmlFor="description">Description (20 characters max)</InputLabel>
            <Input
              id="description"
              value={eventData.eventDesc}
              onChange={(e) => handleEventData({ eventDesc: e.currentTarget.value })}
            />
          </FormControl>
          <div className="modal-btns">
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <Button onClick={handleSaveAppointment}>Save</Button>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
            </ButtonGroup>
          </div>
        </form>
      </Box>
    </Fade>
  );

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {body}
    </Modal>
  );
}

export default AppModal;
