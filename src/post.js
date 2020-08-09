import React from 'react';

function Comment(props) {
    return (
        <li className="list-group-item">
            <h6>{props.comment.name}</h6>
            {props.comment.body}
        </li>
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
