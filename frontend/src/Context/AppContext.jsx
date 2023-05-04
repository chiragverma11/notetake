import { createContext, useReducer } from "react";
// import { Outlet } from "react-router-dom";

export const UserContext = createContext(null);

const initialState = {
  user: { loading: false, isAuthenticated: false, userDetails: null },
  note: {
    loading: false,
    adding: false,
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_USER_REQUEST":
      return {
        user: { ...state.user, loading: true, isAuthenticated: false },
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          isAuthenticated: true,
          userDetails: payload,
        },
      };
    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          userDetails: null,
          isAuthenticated: false,
        },
      };
    case "LOAD_NOTES_REQUEST":
      return {
        ...state,
        note: {
          ...state.note,
          loading: true,
        },
      };
    case "LOAD_NOTES_SUCCESS":
      return {
        ...state,
        note: {
          ...state.note,
          loading: false,
          notes: payload,
        },
      };
    case "NEW_NOTE_REQUEST":
      return {
        ...state,
        note: {
          ...state.note,
          adding: true,
        },
      };
    case "NEW_NOTE_SUCCESS":
      return {
        ...state,
        note: {
          ...state.note,
          adding: false,
        },
      };
    default:
      throw new Error();
  }
};

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
}
