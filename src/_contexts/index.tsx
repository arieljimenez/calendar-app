import React, { createContext, useReducer } from 'react';

import { default as ACTIONS} from './actions';

const initialState: iGlobalState = {
  modalState: {
    showModal: false,
    dateConfig: {
      currentMonth: '',
      currentDate: new Date(),
      currentDay: 0,
      currentFullDate: '',
    },
  },
  eventState: {
    id: 0,
    eventDesc: '',
    eventCity: 'New York',
    eventTime: '09:00', // AM
    color: 'green',
    isEditing: false,
    eventFullDate: '',
    eventDay: 0,
    eventYear: 0,
  }
}

const userReducer = (state: iGlobalState, {payload, type}: iActionProps): iGlobalState => {
  switch (type) {
    case ACTIONS.UPDATE_MODAL_INFO:
      return {
        ...initialState,
        modalState: {
          ...state.modalState,
          ...payload,
        },
      }
    case ACTIONS.EDIT_EVENT:
      return {
        modalState: {
          showModal: true,
          dateConfig: {
            ...state.modalState.dateConfig,
            currentDay: payload?.eventDay || state.modalState.dateConfig.currentDay,
          }
        },
        eventState: {
            ...payload as iModalEventData,
            isEditing: true,
          }
        }
      case ACTIONS.UPDATE_DATE_TIME_EVENT:
        return {
          modalState: {
            ...state.modalState,
            ...payload.modalState,
          },
          eventState: {
            ...state.eventState,
            ...payload.eventState,
          }
        }
    default:  // show an error
      console.info('==')
      console.error("ACTION NOT FOUND: ", { state, payload, type });
      console.info('==')
      return state;
  }
}

export const GlobalContext = createContext([]);

export const GlobalContextProvider = ({ children }: any) => {
  const [globalState, dispatch] = useReducer(userReducer, initialState);

  return (
    <GlobalContext.Provider value={[globalState, dispatch]}>
      {children}
    </GlobalContext.Provider>
  )
}

export { ACTIONS };