import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.scss';

const Navbar = () => (
    <nav className="navbar">
        <Link to="/" className="logo">MODERN_BLOG</Link>
        <div className="nav-links">
            <Link to="/">Główna</Link>
            <Link to="/kategorie">Kategorie</Link>
        </div>
    </nav>
);

const Home = () => (
    <>
        <div className="hero">
            <h1>Witaj na Blogu</h1>
            <p>Odkrywaj najnowsze technologie, trendy we frontendzie i porady dotyczące programowania.</p>
        </div>
        <div className="main-content">
            <div className="posts-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="card">
                        <div className="card-content">
                            <h2>Tytuł przykładowego wpisu numer {i}</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                            <Link to={`/post/${i}`} className="btn">Czytaj dalej</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
);

const SinglePost = () => {
    const { id } = useParams();
    return (
        <div className="main-content">
            <div className="post-view">
                <header>
                    <div className="meta">Opublikowano 12 stycznia 2025</div>
                    <h1>Pełny artykuł o numerze {id}</h1>
                </header>
                <div className="article-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p style={{marginTop: '20px'}}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
                <Link to="/" style={{display: 'block', marginTop: '40px', color: '#3b82f6'}}>← Powrót do listy</Link>
            </div>
        </div>
    );
};

const Categories = () => (
    <div className="main-content">
        <h1 style={{marginBottom: '30px', fontSize: '2.5rem'}}>Kategorie wpisów</h1>
        <div className="categories-flex">
            {['Programowanie', 'Design', 'Backend', 'Frontend', 'Mobile', 'DevOps'].map((cat) => (
                <div key={cat} className="cat-item">
                    <h3>{cat}</h3>
                    <p>Zobacz wszystkie wpisy z tej sekcji</p>
                </div>
            ))}
        </div>
    </div>
);

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/kategorie" element={<Categories />} />
            </Routes>
        </Router>
    );
}

export default App;