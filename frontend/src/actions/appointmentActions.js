import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_PAY_FAIL,
  APPOINTMENT_PAY_REQUEST,
  APPOINTMENT_PAY_SUCCESS,
  APPOINTMENT_SAVE_ADDRESS,
  APPOINTMENT_SAVE_DATE,
  APPOINTMENT_SAVE_PAYMENT_METHOD,
} from "../constants/appointmentConstants";
import axios from "axios";

export const saveAppointmentDate = (data) => (dispatch) => {
  dispatch({
    type: APPOINTMENT_SAVE_DATE,
    payload: data,
  });
  localStorage.setItem("appointmentDate", JSON.stringify(data));
};

export const saveUserAddress = (data) => (dispatch) => {
  dispatch({
    type: APPOINTMENT_SAVE_ADDRESS,
    payload: data,
  });
  localStorage.setItem("userAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: APPOINTMENT_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const createAppointment = (appointment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: APPOINTMENT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/appointment", appointment, config);

    dispatch({
      type: APPOINTMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAppointmentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/appointment/${id}`, config);

    dispatch({
      type: APPOINTMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payAppointment = (appointmentId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: APPOINTMENT_PAY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/appointment/${appointmentId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: APPOINTMENT_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
