import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './styles/App.scss';


const Home = () => (
    <div className="container">
        <h1>Najnowsze wpisy</h1>
        <div className="post-card">
            <h2>Jak zacząć z Reactem?</h2>
            <p>React to potężna biblioteka do budowania interfejsów</p>
            <Link to="/post/1">Czytaj więcej</Link>
        </div>
        <div className="post-card">
            <h2>Sass czy CSS?</h2>
            <p>Preprocesory ułatwiają życie każdemu deweloperowi</p>
            <Link to="/post/2">Czytaj więcej</Link>
        </div>
    </div>
);

const PostPage = () => {
    const { id } = useParams();
    return (
        <div className="container">
            <div className="post-card">
                <h1>Treść wpisu o ID: {id}</h1>
                <p>Tutaj znajdowałaby się pełna treść Twojego artykułu pobrana z bazy MySQL.</p>
                <Link to="/">← Powrót do strony głównej</Link>
            </div>
        </div>
    );
};

const Categories = () => (
    <div className="container">
        <h1>Kategorie</h1>
        <span className="category-badge">Programowanie</span>
        <span className="category-badge">Frontend</span>
        <span className="category-badge">Lifestyle</span>
    </div>
);


function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Strona Główna</Link>
                <Link to="/categories">Kategorie</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </Router>
    );
}

export default App;