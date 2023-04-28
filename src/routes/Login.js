import React, { Component } from "react";
import LoginSlider from "../components/LoginSlider";
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
// import "./App.cs";
import AllianceLogo from "../Images/Alliance Logo.svg";

export default class Login extends Component {
  state = {
    passwordShown: false,
    usernameFieldValue: "",
    // passwordFieldValue: "",
  };

  // Input Username Field handler
  handleUsernameInput = (e) => {
    this.setState({ usernameFieldValue: e.target.value });
  };

  // Reset Input Username Field handler
  clearUsernameField = () => {
    this.setState({ usernameFieldValue: "" });
  };

  /**
   * toggles the a state value using setState
   * to update the state based on the previous state
   */
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordShown: !prevState.passwordShown,
    }));
  };

  render() {
    // const {passwordShown, usernameFieldValue, passwordFieldValue} = this.state;
    const { passwordShown, usernameFieldValue } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col xs={7}>
            <LoginSlider></LoginSlider>
          </Col>
          <Col>
            <img src={AllianceLogo} alt="allianceLogo"></img>
            <h1>Sign In</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formGridUsername">
                <Form.Label htmlFor="username">Username</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    id="username"
                    value={usernameFieldValue}
                    onChange={this.handleUsernameInput}
                  ></Form.Control>
                  <Button
                    variant="danger"
                    className="btn-inline-form"
                    onClick={this.clearUsernameField}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridPassword">
                <Form.Label htmlFor="password">Password</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-lock"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                    </svg>
                  </InputGroup.Text>
                  {/* <Form.Control type={passwordShown ? 'text' : 'password'} id='password' value={passwordFieldValue}></Form.Control> */}
                  <Form.Control
                    type={passwordShown ? "text" : "password"}
                    id="password"
                  ></Form.Control>
                  <Button
                    variant="danger"
                    className="btn-inline-form"
                    onClick={this.togglePasswordVisibility}
                  >
                    {passwordShown ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                    )}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button variant="danger" type="submit">
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
