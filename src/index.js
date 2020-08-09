import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

class PostItBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            error: null
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(
                result => {
                    this.setState({posts: result});
                },
                error => {
                    this.setState({error});
                }
            )
    }

    render() {
        const posts = this.state.posts.map(post => {
            return (
                <div key={post.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p>{post.body}</p>
                    </div>
                    <div className="card-footer">
                        Comments go here
                    </div>
                </div>
            );
        });

        return (
            <div>
                <h1>Posts</h1>
                {posts}
            </div>
        );
    }
}

ReactDOM.render(
    <PostItBoard/>,
    document.getElementById('root')
);
