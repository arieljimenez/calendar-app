/* Use this file to declare any custom file extensions for importing */
/* Use this folder to also add/extend a package d.ts file, if needed. */

/* CSS MODULES */
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

/* CSS */
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.styl';

/* IMAGES */
declare module '*.svg' {
  const ref: string;
  export default ref;
}
declare module '*.bmp' {
  const ref: string;
  export default ref;
}
declare module '*.gif' {
  const ref: string;
  export default ref;
}
declare module '*.jpg' {
  const ref: string;
  export default ref;
}
declare module '*.jpeg' {
  const ref: string;
  export default ref;
}
declare module '*.png' {
  const ref: string;
  export default ref;
}

/* CUSTOM: ADD YOUR OWN HERE */

interface iDateConfig {
  currentDate: Date,
  currentDay: number,
  currentFullDate: string;
  currentMonth: string;
}

interface iModalState {
  showModal: boolean;
  dateConfig: iDateConfig;
}

interface iModalDateInfo {
  year: number;
  month: string;
  day: number;
}

interface iModalEventData {
  id?: number;
  eventDesc: string;
  eventCity: string;
  eventTime: string;
  color: string;
  isEditing?: boolean;
  eventFullDate: string;
  eventDay: number;
  eventYear: number;
}

// STATE MANAGEMENT
type tACTIONS = 'UPDATE_MODAL_INFO'
  | 'SAVE_EVENT'
  | 'EDIT_EVENT'
  | 'UPDATE_DATE_TIME_EVENT'
  | 'DELETE_EVENT'
  | 'DELETE_ALL_DAY_EVENTS';

interface iActionProps {
  payload: iModalState | iModalEventData | iGlobalState;
  type: tACTIONS;
}

interface iGlobalState {
  modalState: iModalState;
  eventState: iModalEventData;
}
