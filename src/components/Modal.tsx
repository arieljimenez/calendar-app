import React from 'react';
import { Box } from 'theme-ui';

import { GlobalContext, ACTIONS } from '../_contexts';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';

import { saveEventLocalStore, getMonth } from '../_helpers';

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
  },
  '.error': {
    color: 'red',
  }
}

const DEFAULT_ERRORS_STATE = {
  emptyDesc: false,
  emptyCity: false,
}

interface AppModalProps {
  setModalState: (state:boolean) => void;
}

const AppModal = ({ setModalState = () => {} }: AppModalProps): React.ReactElement => {
  const [{ modalState, eventState }, dispatch] = React.useContext(GlobalContext) as [iGlobalState, React.Dispatch<iActionProps>];

  const {
    showModal,
    dateConfig: { currentFullDate, currentDate, currentMonth, currentDay },
  } = modalState as iModalState;

  const [eventData, setEventData] = React.useState<iModalEventData>({
    ...eventState,
  });

  // const [currentDateAndTime, setCurrentDateAndTime] = React.useState('');

  const [modalErrors, setModalErrors] = React.useState({
    ...DEFAULT_ERRORS_STATE,
  });

  const currentYear = currentDate.getFullYear();

  let modalTitleVerb = 'New';
  let eventFullDate = currentFullDate;
  let originalEvent: iModalEventData;
  // if we are editing, change the wordering
  if (eventState.isEditing) {
    modalTitleVerb = 'Edit';
    eventFullDate = eventState.eventFullDate;
    originalEvent = { ...eventState }; //copy for later
  }

  const handleClose = () => {
    setModalState(false);
  };

  const handleEventData = (updatedState:object):void => {
    setEventData({
      ...eventData,
      ...updatedState,
    });
  }

  const handleSaveEvent = ():void => {
    //check for errors
    if (!eventData.eventDesc || !eventData.eventCity) {
      setModalErrors({
        emptyDesc: !eventData.eventDesc,
        emptyCity: !eventData.eventCity,
      });
      // give feedback about errors
      return;
    }

    // save event
    saveEventLocalStore({
      dateInfo: {
        year: currentYear,
        month: currentMonth,
        day: currentDay,
      },
      eventData: {
        ...eventState,
        id: new Date().getTime(),
        eventFullDate,
      },
      editInfo: {
        isEditing: eventState.isEditing,
        originalEvent: originalEvent,
      }
    });
    // closeModal
    setModalState(false);
    // reset event data
    // handleEventData({ ...DEFAULT_EVENT_DATA });
    // show a snackBar/feedback
  }

  const DateAndTimeComponent = () => {


    if (eventState.isEditing) {
      const cMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const cDay = currentDay.toString().padStart(2, '0');
      const currentDateAndTime = `${currentYear}-${cMonth}-${cDay}T${eventState.eventTime}`;

      return (
        <TextField
          id="date-time"
          label="Date and Time"
          type="datetime-local"
          value={currentDateAndTime}
          className="datetime"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => handleDateAndTimeEdit(e.currentTarget.value)}
        />
      )
    };

    return (
      <TextField
        id="time"
        label="Time"
        type="time"
        value={eventData.eventTime}
        className="time"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }} // 5 min
        onChange={(e) => handleEventData({ eventTime: e.currentTarget.value })}
      />
    )
  }

  const handleDateAndTimeEdit = (dateAndTime:string) => {
    const newEventDate = new Date(dateAndTime);

    // eventYear = newEventDate.getFullYear();
    const newEventMonth = getMonth({ date: newEventDate });
    // eventDay = newEventDate.getDate();

    const newEventHours = newEventDate.getHours().toString().padStart(2, '0');
    const newEventMins = newEventDate.getMinutes().toString().padStart(2, '0');

    dispatch({
      payload: {
        modalState: {
          showModal,
          dateConfig: {
            currentMonth: newEventMonth,
            currentDate: newEventDate,
            currentDay: newEventDate.getDate(),
            currentFullDate: eventFullDate,
          },
        },
        eventState: {
          ...eventState,
          eventTime: `${newEventHours}:${newEventMins}`,
        }
      },
      type: ACTIONS.UPDATE_DATE_TIME_EVENT,
    });
  }

  const body = (
    <Box className="modal-body-container" sx={sxModal}>
      <h2 className="title">
        {`${modalTitleVerb} Appointment for ${eventFullDate}`}
      </h2>
      <form>
        <div className="time-and-city">
          <DateAndTimeComponent />
          <FormControl>
            <TextField
              required
              error={modalErrors.emptyCity}
              value={eventData.eventCity}
              id="city"
              label="City"
              type="text"
              className="city"
              onChange={(e) => handleEventData({ eventCity: e.currentTarget.value })}
            />
            {modalErrors.emptyCity
              ? <FormHelperText className="error" >Required</FormHelperText>
              : null
            }
          </FormControl>
        </div>
        <FormControl fullWidth className="modal-description">
          <InputLabel htmlFor="description">Description (30 characters max)</InputLabel>
          <Input
            required
            error={modalErrors.emptyDesc}
            id="description"
            value={eventData.eventDesc}
            onChange={(e) => handleEventData({ eventDesc: e.currentTarget.value })}
            inputProps={{
              maxLength: 30,
            }}
          />
          {modalErrors.emptyDesc
            ? <FormHelperText className="error" >Required</FormHelperText>
            : null
          }
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="description">Color</InputLabel>
          <NativeSelect
            value={eventData.color}
            onChange={(e) => handleEventData({ color: e.currentTarget.value })}
            className="event-color"
          >
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
          </NativeSelect>
        </FormControl>
        <div className="modal-btns">
          <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button onClick={handleSaveEvent}>Save</Button>
            <Button color="secondary" onClick={handleClose}>Cancel</Button>
          </ButtonGroup>
        </div>
      </form>
    </Box>
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
