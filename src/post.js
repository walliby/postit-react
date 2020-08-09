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

export default function Post(props) {
    const comments = props.post.comments.map(comment => {
        return <Comment key={comment.id} comment={comment}/>;
    });

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{props.post.title}</h5>
                <strong>{props.post.user.name}</strong>
                <Address user={props.post.user}/>
                <p>{props.post.body}</p>
            </div>
            <div className="card-footer">
                <ul className="list-group mt-3" role="region" aria-live="polite">
                    {comments}
                </ul>
            </div>
        </div>
    );
}
