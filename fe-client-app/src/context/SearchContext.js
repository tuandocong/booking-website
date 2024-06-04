import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  destination: "",
  dates: [{ startDate: new Date(), endDate: new Date(), key: "selection" }],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    case "UPDATE_DATES":
      // console.log("dp", action.payload);
      return { ...state, dates: action.payload };
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        destination: state.destination,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
