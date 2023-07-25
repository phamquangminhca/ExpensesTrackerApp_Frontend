import React, { createContext, useReducer } from "react";
import axios from "axios";
import { API_URL_TRANSACTION } from "../../../utils/apiURL";
import {
  TRANSACTION_CREATION_SUCCESS,
  TRANSACTION_CREATION_FAIL,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_STARTED,
  TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
} from "./transactionsActionTypes";

export const TransactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};

const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_DETAILS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION_DETAILS_SUCCESS:
      return {
        ...state,
        transaction: payload,
        loading: false,
        error: null,
      };
    case TRANSACTION_DETAILS_FAIL:
      return {
        ...state,
        transaction: null,
        loading: false,
        error: payload,
      };
    case TRANSACTION_CREATION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_UPDATE_SUCCESS:
      return {
        ...state,
        transaction: payload,
        loading: false,
        error: null,
      };
    case TRANSACTION_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  //Get transaction detail action
  const getTransactionDetails = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Set loading to true before making the API call
      dispatch({ type: TRANSACTION_DETAILS_STARTED });

      const res = await axios.get(`${API_URL_TRANSACTION}/${id}`, config);
      if (res?.data) {
        //dispatch
        dispatch({
          type: TRANSACTION_DETAILS_SUCCESS,
          payload: res?.data,
        });
      }
      //   console.log(res);
    } catch (error) {
      dispatch({
        type: TRANSACTION_DETAILS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //create transaction
  const createTransactionAction = async (accountData) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.post(API_URL_TRANSACTION, accountData, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: TRANSACTION_CREATION_SUCCESS,
          payload: res?.data,
        });
        console.log(res?.data?.data?.account);
        window.location.href = `/account-details/${res?.data?.data?.account}`;
      }
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  // Action to update transaction details
  const updateTransactionDetails = async (
    transactionID,
    updatedTransactionData
  ) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };

      // request
      const res = await axios.put(
        `${API_URL_TRANSACTION}/${transactionID}`,
        updatedTransactionData,
        config
      );

      if (res?.data) {
        // Dispatch
        dispatch({
          type: TRANSACTION_UPDATE_SUCCESS,
          payload: res?.data,
        });
        window.location.href = `/account-details/${res?.data?.data?.account}`;
      }
    } catch (error) {
      dispatch({
        type: TRANSACTION_UPDATE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        getTransactionDetails,
        transaction: state?.transaction,
        transactions: state?.transactions,
        createTransactionAction,
        error: state?.error,
        loading: state?.loading,
        updateTransactionDetails,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
