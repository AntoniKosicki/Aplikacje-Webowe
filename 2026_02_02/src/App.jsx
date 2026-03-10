import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';

const Navbar = () => (
    <nav className="navbar">
        <Link to="/" className="logo">MODERN_BLOG</Link>
        <div className="nav-links">
            <Link to="/">Główna</Link>
        </div>
    </nav>
);

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <>
            <div className="hero">
                <h1>Baza Wpisów</h1>
                <p>Przeglądaj najnowsze artykuły pobrane bezpośrednio z zewnętrznego serwera API.</p>
            </div>
            <div className="main-content">
                <div className="posts-grid">
                    {posts.map((post) => (
                        <div key={post.id} className="card">
                            <div className="card-content">
                                <h2>{post.title}</h2>
                                <p>{post.body.substring(0, 100)}...</p>
                                <Link to={`/post/${post.id}`} className="btn">Czytaj dalej</Link>
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
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(postData => {
                setPost(postData);
                return fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
            })
            .then(res => res.json())
            .then(userData => setUser(userData));

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(res => res.json())
            .then(commentData => setComments(commentData));
    }, [id]);

    if (!post || !user) return <div className="loader">Ładowanie danych...</div>;

    return (
        <div className="main-content">
            <div className="post-view">
                <header>
                    <div className="meta">Autor: {user.name} ({user.email})</div>
                    <h1>{post.title}</h1>
                </header>
                <div className="article-body">
                    <p>{post.body}</p>
                </div>

                <section className="comments-section">
                    <h3>Komentarze ({comments.length})</h3>
                    <div className="comments-grid">
                        {comments.map(comment => (
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
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<SinglePost />} />
            </Routes>
        </Router>
    );
}

export default App;