import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './App.scss';

const queryClient = new QueryClient();

const Navbar = () => (
    <nav className="navbar">
        <Link to="/" className="logo">QUERY_BLOG</Link>
        <div className="nav-links">
            <Link to="/">Główna</Link>
        </div>
    </nav>
);

const PostList = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
    });

    if (isLoading) return <div className="loader">Pobieranie listy wpisów...</div>;
    if (error) return <div className="loader">Wystąpił błąd: {error.message}</div>;

    return (
        <>
            <div className="hero">
                <h1>React Query Engine</h1>
                <p>Dane są automatycznie cache'owane i synchronizowane w tle.</p>
            </div>
            <div className="main-content">
                <div className="posts-grid">
                    {posts.map((post) => (
                        <div key={post.id} className="card">
                            <div className="card-content">
                                <h2>{post.title}</h2>
                                <p>{post.body.substring(0, 100)}...</p>
                                <Link to={`/post/${post.id}`} className="btn">Szczegóły</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const SinglePost = () => {
    const { id } = useParams();

    const { data: post, isLoading: postLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json()),
    });

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user', post?.userId],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(res => res.json()),
        enabled: !!post?.userId,
    });

    const { data: comments, isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => res.json()),
    });

    if (postLoading || userLoading || commentsLoading) return <div className="loader">Synchronizacja danych...</div>;

    return (
        <div className="main-content">
            <div className="post-view">
                <header>
                    <div className="meta">Autor: {user?.name} | {user?.email}</div>
                    <h1>{post?.title}</h1>
                </header>
                <div className="article-body">
                    <p>{post?.body}</p>
                </div>

                <section className="comments-section">
                    <h3>Komentarze ({comments?.length})</h3>
                    <div className="comments-grid">
                        {comments?.map(comment => (
                            <div key={comment.id} className="comment-card">
                                <strong>{comment.email}</strong>
                                <p>{comment.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Link to="/" className="back-link">← Powrót do listy</Link>
            </div>
        </div>
    );
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/post/:id" element={<SinglePost />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;