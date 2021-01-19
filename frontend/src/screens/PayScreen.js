import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Row, Col, ListGroup, Card, Button, Container } from "react-bootstrap";
import { APPOINTMENT_PAY_RESET } from "../constants/appointmentConstants";
import { getAppointmentDetails } from "../actions/appointmentActions";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HpzXbDAmERAuXVO6xDI2PYWhySNN2czMLGbklM3qVzwmUw7uaynq3BcZU4d72rZqNmEBLcp0CGXifH2m2IZU05v00g2q0gP5x"
);

const PayScreen = ({ match }) => {
  const dispatch = useDispatch();

  const appointmentId = match.params.id;

  //Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const appointmentDetails = useSelector((state) => state.appointmentDetails);
  const { appointment, loading, error } = appointmentDetails;

  const appointmentPay = useSelector((state) => state.appointmentPay);
  const { loading: loadingPay, success: successPay } = appointmentPay;

  useEffect(() => {
    if (!appointment || successPay || appointment._id !== appointmentId) {
      dispatch({ type: APPOINTMENT_PAY_RESET });
      dispatch(getAppointmentDetails(appointmentId));
    }
  }, [dispatch, appointment, successPay, appointmentId]);

  const successPayementHandler = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const { data } = await axios.post(
      "/api/stripe/create-checkout-session",
      appointment
    );

    const session = data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container>
      <h1>Appointment {appointment._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Details</h2>
              <p>
                <strong>User name: </strong>
                {appointment.user.name}
              </p>
              <p>
                <strong>Email : </strong>
                <a href={`mailto:${appointment.user.email}`}>
                  {appointment.user.email}
                </a>
              </p>
              <p>
                <strong>Adresse : </strong>
                {appointment.address.address},{appointment.address.city}{" "}
                {appointment.address.postalCode},{appointment.address.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <p>
                <strong>Date : </strong>
                {appointment.appointmentDate.split("T")[0]}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <p>
                <strong>Payment method : </strong>
                {appointment.paymentMethod}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${addDecimals(appointment.price)}</Col>
                </Row>
              </ListGroup.Item>
              {!appointment.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <Button
                    type="button"
                    className="btn-block"
                    id="checkout-button"
                    onClick={successPayementHandler}
                    role="link"
                  >
                    Payer
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PayScreen;
