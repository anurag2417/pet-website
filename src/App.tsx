// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Categories from './pages/Categories.tsx';
import PetProfile from './pages/PetProfile.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/pet/:category/:name" element={<PetProfile />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;