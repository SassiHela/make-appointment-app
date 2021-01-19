import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  createAppointmentReducer,
  appointmentDetailsReducer,
  appointmentPayReducer,
} from "./reducers/appointmentReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createAppointment: createAppointmentReducer,
  appointmentDetails: appointmentDetailsReducer,
  appointmentPay: appointmentPayReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userAddressFromStorage = localStorage.getItem("userAddress")
  ? JSON.parse(localStorage.getItem("userAddress"))
  : {};

const appointmentDateFromStorage = localStorage.getItem("appointmentDate")
  ? JSON.parse(localStorage.getItem("appointmentDate"))
  : null;

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  createAppointment: {
    appointmentDate: appointmentDateFromStorage,
    userAddress: userAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
