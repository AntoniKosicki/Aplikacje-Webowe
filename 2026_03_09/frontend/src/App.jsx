import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import './App.scss';

const queryClient = new QueryClient();
const API_URL = 'http://localhost:3000/api';

const PostList = () => {
    const { data: posts, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: () => axios.get(`${API_URL}/posts`).then(res => res.data)
    });

    if (isLoading) return <div className="loader">Wczytywanie treści...</div>;

    return (
        <div>
            <section className="hero">
                <div className="hero-inner">
                    <h1>System Blogowy v2</h1>
                    <p>Pełna integracja z bazą MySQL na porcie 3306.</p>
                </div>
            </section>
            <main className="main-content">
                <div className="container-inner">
                    <div className="posts-grid">
                        {posts?.map(post => (
                            <div key={post.id} className="card">
                                <div className="card-content">
                                    <h2>{post.tytul}</h2>
                                    <p>{post.tresc.substring(0, 180)}...</p>
                                    <Link to={`/post/${post.id}`} className="btn">Czytaj wpis</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

const PostPage = () => {
    const { id } = useParams();
    const qc = useQueryClient();
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const { data: post, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => axios.get(`${API_URL}/posts/${id}`).then(res => res.data)
    });

    const mutation = useMutation({
        mutationFn: (comment) => axios.post(`${API_URL}/posts/${id}/comments`, comment),
        onSuccess: () => {
            qc.invalidateQueries(['post', id]);
            setAuthor('');
            setText('');
        }
    });

    if (isLoading) return <div className="loader">Pobieranie danych posta...</div>;

    return (
        <div className="main-content">
            <div className="container-inner">
                <div className="post-detail">
                    <header>
                        <span className="meta">ID wpisu: {post?.id}</span>
                        <h1>{post?.tytul}</h1>
                    </header>
                    <article className="article-text">
                        {post?.tresc}
                    </article>
                    <section className="comments-box">
                        <h3>Komentarze ({post?.komentarze?.length || 0})</h3>
                        <div className="comments-list">
                            {post?.komentarze?.map(c => (
                                <div key={c.id} className="comment-item">
                                    <strong>{c.autor}</strong>
                                    <p>{c.tresc}</p>
                                </div>
                            ))}
                        </div>
                        <form className="form-group" onSubmit={(e) => {
                            e.preventDefault();
                            mutation.mutate({ autor: author, tresc: text });
                        }}>
                            <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Twoje imię" required />
                            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Napisz coś..." required />
                            <button type="submit" disabled={mutation.isPending}>Dodaj komentarz</button>
                        </form>
                    </section>
                    <Link to="/" className="back-link">← Powrót do listy</Link>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <nav className="navbar">
                    <div className="nav-container">
                        <Link to="/" className="logo">BLOG<span>SQL</span></Link>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/post/:id" element={<PostPage />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}