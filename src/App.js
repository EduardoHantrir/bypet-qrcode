// Importando os componentes necessários do React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importando o componente PetPerfil
import PetPerfil from './pages/perfilPet/petPerfil'

// Definindo o componente App
function App() {
  return (
    // Usando o componente Router para definir as rotas da aplicação
    <Router>
      <Routes>
        {/* Definindo a rota para o perfil do pet. O id do pet é passado como parâmetro na URL */}
        <Route path="/pet/:petId" element={<PetPerfil />} />
      </Routes>
    </Router>
  );
}

export default App;
