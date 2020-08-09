import React from 'react';

export default function Post(props) {
    return (
        <div key={props.post.id} className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{props.post.title}</h5>
                <p>{props.post.body}</p>
            </div>
            <div className="card-footer">
                Comments go here
            </div>
        </div>
    );
}
