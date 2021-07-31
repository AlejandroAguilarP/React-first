import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Button, Label, Col, Row } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxlength = (len) => (val) => !val || val.length <= len;
const minlength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
    alert("Curren state is: " + JSON.stringify(values));
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  render() {
    return (
      <>
        <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody >
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
              <Label htmlFor="rating" md={10}>
                  {" "}
                  Rating{" "}
                </Label>
                <Col md={12}>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                >
                  <option selected disabled>Select...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
              <Label htmlFor="author" md={10}>
                  {" "}
                  Author{" "}
                </Label>
                <Col md={12}>

                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  className="form-control"
                  validators={{
                    minlength: minlength(3),
                    maxlength: maxlength(15),
                  }}
                  />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    minlength: "Must be greater than 3 characters",
                    maxlength: "Must be 15 characters or less",
                  }}
                  />
                  </Col>
              </Row>
              <Row className="form-group">
              <Label htmlFor="comment" md={10}>
                  {" "}
                  Comment{" "}
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    className="form-control"
                    rows="7"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={10}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
      </>
    );
  }
}
function RenderDish({ dish }) {
  return (
    <div className="col-md-5 col-12 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle> {dish.name} </CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
function RenderComments({ comments }) {
  const comms = comments.map((comment) => {
    return (
      <React.Fragment key={comment.id}>
        <li className="mt-1"> {comment.comment} </li>
        <li>
          {" "}
          -- {comment.author},{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(comment.date)))}{" "}
        </li>
      </React.Fragment>
    );
  });
  return (
    <div className="col-md-5 col-12 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">{comms}</ul>

      <CommentForm />
    </div>
  );
}

const Dishdetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Dishdetail;
