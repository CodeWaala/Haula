import React, { Component } from "react";
import "./footer.css";
import logoFooter from "../../Pages/Home/components/images/logo_blue.png";
import { Link} from 'react-router-dom';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';

export class Footer extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value:'',
      show: false
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <footer id="Footer">
        <div className="container">
          <div class="row footergrid">
            <div class="col-sm-3">
              <h2 class="logo">
                <a><img src={logoFooter} className="logoFooter" />  </a>
              </h2>
            </div>
            <div className="col-sm-2 getStarted">
              <h5>Get started</h5>
              <ul className="mainMenu">
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <a>Sign up</a>
                </li>
                <li>
                  <a>Downloads</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-2 getStarted">
              <h5>About us</h5>
              <ul className="firstMenu">
                <li>
                  <a>Company Information</a>
                </li>
                <li>
                  <a>Contact us</a>
                </li>
                <li>
                  <a>Reviews</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-2">
              <h5>Support</h5>
              <ul className="secondMenu">
                <li>
                  <a>FAQ</a>
                </li>
                <li>
                  <Link to="/Help">Help</Link>
                </li>
                <li>
                  <a>Forums</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3 socialNetworks">
              <div class="social-networks">
                <a  class="twitter">
                  <i class="fa fa-twitter" />
                </a>
                <a  class="facebook">
                  <i class="fa fa-facebook" />
                </a>
                <a  class="google">
                  <i class="fa fa-google-plus" />
                </a>
              </div>
    <button type="button" onClick={this.handleShow} className="btn">
              Contact Us
              </button>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Contact Us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <FormControl
                      text="text"
                      value={this.state.value}
                      placeholder="Ask Away"
                      onChange={this.handleChange}
                    />
                  </Form>
                  <hr />
                  <h4>Overflowing text to show scroll behavior</h4>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleSubmit}>Submit</Button>
                  <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        <div className="footer-copyright flex-2">
          <p>© 2018 Copyright Text </p>
        </div>
      </footer>
      );
    }
  }
