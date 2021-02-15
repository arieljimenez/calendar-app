import React, { createContext, ReactElement, useReducer } from 'react';

import { default as ACTIONS} from './actions';
import { setToLocalStore, delFromLocalStore } from '../_helpers';


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
  eventsState: {
    allEvents: [],
    currentEvent: {
      eventDesc: '',
      eventCity: 'New York',
      eventTime: '09:00', // AM
      color: 'green',
    }
  }
}

const userReducer = (state: iGlobalState, action: iActionProps): iGlobalState => {
  switch (action.type) {
    case ACTIONS.UPDATE_MODAL_INFO:
      return {
        ...state,
        modalState: {
          ...state.modalState,
          ...action.payload as iModalState,
        }
      }
    default:  // show an error
      console.info('==')
      console.error("ACTION NOT FOUND: ", { state, action });
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