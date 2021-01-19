import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { saveAppointmentDate } from "../actions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";

const DateScreen = ({ history }) => {
  const appointment = useSelector((state) => state.appointmentDetails);
  const { appointmentDate } = appointment;

  const [selectedDate, handleDateChange] = useState(appointmentDate);

  const dispatch = useDispatch();

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(saveAppointmentDate(selectedDate));
    history.push("/address");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Choose date</h1>

      <Form onSubmit={submithandler}>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default DateScreen;
