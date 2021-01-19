import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_PAY_FAIL,
  APPOINTMENT_PAY_REQUEST,
  APPOINTMENT_PAY_RESET,
  APPOINTMENT_PAY_SUCCESS,
  APPOINTMENT_SAVE_ADDRESS,
  APPOINTMENT_SAVE_DATE,
  APPOINTMENT_SAVE_PAYMENT_METHOD,
} from "../constants/appointmentConstants";

export const createAppointmentReducer = (
  state = { userAddress: {}, paymentMethod: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return { ...state, loading: true };
    case APPOINTMENT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        appointment: action.payload,
      };
    case APPOINTMENT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case APPOINTMENT_SAVE_DATE:
      return {
        ...state,
        appointmentDate: action.payload,
      };
    case APPOINTMENT_SAVE_ADDRESS:
      return {
        ...state,
        userAddress: action.payload,
      };
    case APPOINTMENT_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export const appointmentDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case APPOINTMENT_DETAILS_SUCCESS:
      return { loading: false, appointment: action.payload };
    case APPOINTMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentPayReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_PAY_REQUEST:
      return { loading: true };
    case APPOINTMENT_PAY_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_PAY_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_PAY_RESET:
      return {};
    default:
      return state;
  }
};
