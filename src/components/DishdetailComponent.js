import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
class Dishdetail extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            selectedDish: null
        }
        console.log('Menu Component constructor is invoked');
    }
    renderDish(dish) {
        if(dish != null){
            return(
                <div className="col-md-5 col-12 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle> {dish.name} </CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                    </Card>
                </div>
            );
        } else{
            return(
                <div></div>
            );
        }
    }
    renderComments(dish) {

        if(dish != null){
            const comments = dish.comments.map(comment => {
                const date = new Date (comment.date);
                return(
                    <ul key={comment.id} className="list-unstyled">
                        <li className="mt-1"> {comment.comment} </li>
                        <li> -- {comment.author}, { date.toLocaleString('en-En', { month: 'short' }) + ' ' + date.getDate() + ', ' + date.getFullYear()} </li>
                    </ul>
                );
            });
            return(
                <div className="col-md-5 col-12 m-1">
                    <h4>Comments</h4>
                    {comments}
                </div>
            );
        } else{
            return(
                <div></div>
            );
        }
    }

    render() {
        const dish = this.props.dish;
        return(
            <div className="row">
                    {this.renderDish(dish)}
                    {this.renderComments(dish)}
            </div>
        );
    }
}

export default Dishdetail;