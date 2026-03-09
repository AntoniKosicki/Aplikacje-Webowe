import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = () => <div><h1>Strona Główna</h1><p>Witaj na naszym blogu!</p></div>;
const About = () => <div><h1>O nas</h1><p>Jesteśmy pasjonatami Reacta.</p></div>;
const Contact = () => <div><h1>Kontakt</h1><p>Napisz do nas na: kontakt@example.com</p></div>;
const NotFound = () => <div><h1>404</h1><p>Strona nie istnieje!</p></div>;

function App() {
    return (
        <Router>
            <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
                <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
                <Link to="/about" style={{ marginRight: '10px' }}>O nas</Link>
                <Link to="/contact">Kontakt</Link>
            </nav>

            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* Łapacz błędnych adresów */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;