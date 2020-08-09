import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Post from './Post'

class PostItBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            error: null
        }
    }

    componentDidMount() {
        const endPoint = `https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user`;

        fetch(endPoint)
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
                <Post key={post.id} post={post}/>
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
