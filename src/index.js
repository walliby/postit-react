import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Post from './Post';

function PageButton(props) {
    return (
        <button
            ref={props.reference}
            onClick={props.handleClick}
            type="button"
            className="btn btn-info"
            aria-label={`${props.label} page of posts`}
            disabled={props.disabled}
        >{props.label}</button>
    );
}

class PostItBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            posts: [],
            page: 1,
            totalCount: 0
        };

        this.prevButtonRef = React.createRef();
        this.nextButtonRef = React.createRef();
        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
    }

    endPoint(page) {
        return `https://jsonplaceholder.typicode.com/posts
            ?_page=${page}
            &_embed=comments
            &_expand=user`
            .replace(/\s/g, '');
    }

    fetchPosts(page) {
        let totalCount;

        fetch(this.endPoint(page))
            .then(result => {
                totalCount = parseInt(result.headers.get('x-total-count'));
                return result.json()
            })
            .then(
                result => {
                    this.setState({
                        posts: result,
                        page: page,
                        totalCount: totalCount
                    });
                },
                error => {
                    this.setState({error});
                }
            )
    }

    componentDidMount() {
        this.fetchPosts(1);
    }

    fetchNextPage() {
        this.fetchPosts(this.state.page + 1);
    }

    fetchPreviousPage() {
        this.fetchPosts(this.state.page - 1);
    }

    disableNextButton() {
        return this.state.page === Math.ceil(this.state.totalCount / 10);
    }

    disablePrevButton() {
        return this.state.page === 1;
    }

    render() {
        let body;

        if (this.state.error) {
            body = <div>Error: {this.state.error.message}</div>;
        } else {
            const posts = this.state.posts.map(post => {
                return <Post key={post.id} post={post}></Post>;
            });

            body = (
                <ul className="list-group" role="region" aria-live="polite">
                    {posts}
                </ul>
            );
        }

        if (this.disablePrevButton() && this.nextButtonRef.current !== null) {
            this.nextButtonRef.current.focus();
        }

        if (this.disableNextButton() && this.prevButtonRef.current !== null) {
            this.prevButtonRef.current.focus();
        }

        return (
            <div>
                <h1>Posts</h1>
                <div className="d-flex justify-content-between mb-2">
                    <PageButton 
                        reference={this.prevButtonRef}
                        label="Prev"
                        handleClick={this.fetchPreviousPage}
                        disabled={this.disablePrevButton()}
                    />
                    <PageButton 
                        reference={this.nextButtonRef}
                        label="Next"
                        handleClick={this.fetchNextPage}
                        disabled={this.disableNextButton()}
                    />
                </div>
                {body}
            </div>
        );
    }
}

ReactDOM.render(
    <PostItBoard />,
    document.getElementById('root')
);
