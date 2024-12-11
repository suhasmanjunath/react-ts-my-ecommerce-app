import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { ProductPage } from './pages/ProductPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  )
}

export default App;
