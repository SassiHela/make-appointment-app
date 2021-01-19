import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/appointmentActions";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const appointment = useSelector((state) => state.createAppointment);
  const { userAddress } = appointment;

  if (!userAddress) {
    history.push("/address");
  }

  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/registration");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Payment method</h1>
      <Form onSubmit={submithandler}>
        <Form.Group>
          <Form.Label as="legend">Select method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
