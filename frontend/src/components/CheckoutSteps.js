import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4, step5 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Sing In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sing In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/date">
            <Nav.Link>Date</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>date</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/address">
            <Nav.Link>Address</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Address</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step5 ? (
          <LinkContainer to="/registration">
            <Nav.Link>Registration</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Registration</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
