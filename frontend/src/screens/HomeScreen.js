import React from "react";
import { Container } from "react-bootstrap";

const HomeScreen = ({ history }) => {
  const checkoutHandler = () => {
    history.push("/login?redirect=date");
  };

  return (
    <>
      <Container>
        {/* <Carousel /> */}
        <div className="content">
          <div className="textBox">
            <h2>
              Sit voluptate amet cupidatat <br></br>reprehenderit .
            </h2>
            <p>
              Ea excepteur fugiat duis eu Lorem ut et duis sunt. Velit aute
              consectetur excepteur pariatur reprehenderit nulla enim. Ut velit
              sint aliquip commodo commodo ex excepteur et id anim.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-success"
              onClick={checkoutHandler}
            >
              Make appointment
            </button>
          </div>
          <div className="imgBox">
            <img
              // src="/assets/photo-recycle-bins.jpg"
              src="/assets/photo-recycle-bins.jpg"
              className="recycle-container-img"
              alt="main-img"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomeScreen;
