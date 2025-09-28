import React, { useReducer, useContext } from 'react';

const AppContext = React.createContext<AppStateContext|null>(null);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const initialAppState: AppState = { value: APP_STATE.LOADING };
  const [ state, dispatch ] = useReducer(appStateReducer, initialAppState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useChartContext must be used within a ChartContextProvider');
  }
  return context;
};

const appStateReducer = (appState: AppState, action: AppReducerAction): AppState => {
  switch (action.type) {
    case APP_REDUCER_ACTION.SHOW_INTRO:
      return { value: APP_STATE.INTRO };
    case APP_REDUCER_ACTION.GO_TO_SLIDE:
      return { value: APP_STATE.ON_SLIDE, data: action.payload };
    case APP_REDUCER_ACTION.GO_TO_TRANSITION:
      return { value: APP_STATE.ON_TRANSITION };
    default:
      return appState;
  }
};

export type AppStateContext = {
  state: AppState;
  dispatch: React.Dispatch<AppReducerAction>;
};

type ObjectValues<T> = T[keyof T];

export type AppState = {
  value: ObjectValues<typeof APP_STATE>;
  data?: AppActionPayload;
};

export type AppReducerAction = {
  type: ObjectValues<typeof APP_REDUCER_ACTION>;
  payload?: AppActionPayload;
};

export type AppActionPayload = {
  slideIndex?: number;
}

export const APP_STATE = {
  LOADING: 'LOADING',
  INTRO: 'INTRO',
  ON_TRANSITION: 'ON_TRANSITION',
  ON_SLIDE: 'ON_SLIDE',
} as const;

export const APP_REDUCER_ACTION = {
  SHOW_INTRO: 'SHOW_INTRO',
  GO_TO_SLIDE: 'GO_TO_SLIDE',
  GO_TO_TRANSITION: 'GO_TO_TRANSITION',
} as const;
