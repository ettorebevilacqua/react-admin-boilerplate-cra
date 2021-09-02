import React, { useEffect } from 'react';

interface Authorization {
  [x: string]: string[];
}

interface StateProps {
  token: string;
  status: string;
  authorizations: Authorization;
}

var UserStateContext = React.createContext({} as StateProps);
var UserDispatchContext = React.createContext({} as any);

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false };
    case 'SET_USER':
      return { ...state, ...action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {});

  useEffect(() => {
    let userSettings = window.localStorage.getItem('authentication');
    if (!!userSettings) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(userSettings) });
    }
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, signOut };

// ###########################################################

function signOut(dispatch, history) {
  localStorage.removeItem('id_token');
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
  history.push('/login');
}
