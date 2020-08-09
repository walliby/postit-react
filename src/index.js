import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

class PostItBoard extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <h1>Posts</h1>
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Post title</h5>
                        <p>Post goes here</p>
                    </div>
                    <div className="card-footer">
                        Comments go here
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <PostItBoard/>,
    document.getElementById('root')
);
