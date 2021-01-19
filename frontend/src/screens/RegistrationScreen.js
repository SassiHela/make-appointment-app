import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Card, Container } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createAppointment } from "../actions/appointmentActions";

const RegistrationScreen = ({ history }) => {
  const dispatch = useDispatch();

  const appointmentDetails = useSelector((state) => state.createAppointment);
  const { appointmentDate, userAddress, paymentMethod } = appointmentDetails;

  const appointmentCreated = useSelector((state) => state.createAppointment);
  const { appointment, success, error } = appointmentCreated;

  useEffect(() => {
    if (success) history.push(`/appointment/${appointment._id}`);
    // eslint-disable-next-line
  }, [history, success]);

  const registrationHandler = () => {
    dispatch(
      createAppointment({
        appointmentDate,
        address: userAddress,
        paymentMethod,
        price: 60.0,
      })
    );
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 step5 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Date</h2>
              <p>{appointmentDate}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Address</h2>
              <p>
                {userAddress.address},{userAddress.city}{" "}
                {userAddress.postalCode},{userAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment method</h2>
              {paymentMethod}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>Summary</h5>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$60.0</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  onClick={registrationHandler}
                >
                  Register
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationScreen;
