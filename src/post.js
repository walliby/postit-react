import React from 'react';

function Comment(props) {
    return (
        <li className="list-group-item">
            <h6>{props.comment.name}</h6>
            {props.comment.body}
        </li>
    );
}

function Address(props) {
    return(
        <address role="region" aria-live="polite">
            {props.user.address.street} {props.user.address.suite}<br/>
            {props.user.address.city}<br/>
            {props.user.address.zipcode}<br/>
            <a href={`tel:+${props.user.phone}`}>{props.user.phone}</a><br/>
            <a href={`mailto:+${props.user.email}`}>{props.user.email}</a>
        </address>
    );
}

function ToggleLink(props) {
    return (
        <button 
            type="button" 
            className="btn btn-link p-0"
            onClick={props.handleClick}
            aria-label={`${props.label} Click to expand.`}
        >{props.label}</button>
    );
}

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComments: false,
            showUserInfo: false
        };
        this.toggleComments = this.toggleComments.bind(this);
        this.toggleUserInfo = this.toggleUserInfo.bind(this);
    }

    toggleComments() {
        this.setState({showComments: !this.state.showComments});
    }

    toggleUserInfo() {
        this.setState({showUserInfo: !this.state.showUserInfo});
    }

    commentsCount() {
        return this.props.post.comments.length;
    }

    render() {
        const comments = this.props.post.comments.map(comment =>
            <Comment key={comment.id} comment={comment}/>
        );

        return (
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{this.props.post.title}</h5>
                    <ToggleLink handleClick={this.toggleUserInfo} label={this.props.post.user.name}/>
                    {this.state.showUserInfo ? <Address user={this.props.post.user}/> : ''}
                    <p className="card-text">{this.props.post.body}</p>
                </div>
                <div className="card-footer">
                    <ToggleLink handleClick={this.toggleComments} label={`${this.commentsCount()} comments`}/>
                    {this.state.showComments && this.commentsCount() 
                        ? <ul className="list-group mt-3" role="region" aria-live="polite">{comments}</ul> 
                        : ''
                    }
                </div>
            </div>
        );
    }
}
