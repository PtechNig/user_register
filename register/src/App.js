import './App.css';
import Home from './Components/Home';
import Create from './Components/Create';
import Update from './Components/Update';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
      <>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Update/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
        <Footer/>
      </>
  );
}

export default App;
