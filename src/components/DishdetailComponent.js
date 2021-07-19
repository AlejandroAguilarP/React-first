import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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
    const comms = comments.map(comment => {
        return (
            <React.Fragment key={comment.id}>
                <li className="mt-1"> {comment.comment} </li>
                <li> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </li>
            </React.Fragment>
        );
    });
    return (
        <div className="col-md-5 col-12 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comms}
            </ul>
        </div>
    );
}

const Dishdetail = (props) => {

    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.dish.comments} />
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default Dishdetail;