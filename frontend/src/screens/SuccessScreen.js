import React, { useEffect } from "react";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { payAppointment } from "../actions/appointmentActions";
import { Container } from "react-bootstrap";

const SuccessScreen = ({ match }) => {
  const dispatch = useDispatch();

  const appointmentId = match.params.id;

  useEffect(() => {
    dispatch(payAppointment(appointmentId));
  }, [dispatch, appointmentId]);
  return (
    <Container>
      <Message variant="success">Payment completed successfully</Message>
    </Container>
  );
};

export default SuccessScreen;
