import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetPerfil from './pages/perfilPet/petPerfil'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pet/:petId" element={<PetPerfil />} />
      </Routes>
    </Router>
  );
}

export default App;
