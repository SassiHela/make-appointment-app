import React from "react";
import { Container } from "react-bootstrap";
import Message from "../components/Message";

const CancelScreen = () => {
  return (
    <Container>
      <Message variant="danger">Payment cancelled.</Message>
    </Container>
  );
};

export default CancelScreen;
