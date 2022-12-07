import './App.scss';
import UserLogin from './components/userLogin/UserLogin';
import UserSignUp from './components/userSignUp/UserSignUp';
import MainPage from './pages/MainPage';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
