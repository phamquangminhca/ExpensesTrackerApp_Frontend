import axios from "axios";
import { API_URL_ACCOUNT } from "../../../utils/apiURL";
import {
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_CREATION_SUCCESS,
  ACCOUNT_CREATION_FAIL,
} from "./accountActionTypes";
import { createContext, useReducer } from "react";

export const accountContext = createContext();

//Initial State
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem('userAuth')),
  account: null,
  accounts: [],
  loading: false,
  error: null,
};

//Reducer
const accountReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_DETAILS_FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    case ACCOUNT_CREATION_SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_CREATION_FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

//Provider
export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);
  //   console.log(state);
  //Get account detail action
  const getAccountDetails = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(`${API_URL_ACCOUNT}/${id}`, config);
      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: ACCOUNT_DETAILS_SUCCESS,
          payload: res?.data,
        });
      }
      //   console.log(res);
    } catch (error) {
      dispatch({
        type: ACCOUNT_DETAILS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //Create account action
  const createAccountAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(`${API_URL_ACCOUNT}`, formData, config);
      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: ACCOUNT_CREATION_SUCCESS,
          payload: res?.data,
        });
        console.log();
        window.location.href = `/account-details/${res?.data?.data?._id}`;
      }
        console.log(res?.data?.data?._id);
    } catch (error) {
      dispatch({
        type: ACCOUNT_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <accountContext.Provider
      value={{
        getAccountDetails,
        account: state?.account,
        createAccountAction,
        error: state?.error,
      }}
    >
      {children}
    </accountContext.Provider>
  );
};
