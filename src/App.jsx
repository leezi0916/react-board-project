import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import UserRegistration from './pages/UserRegistration';
import BoardEnrollForm from './pages/BoardEnrollForm';
import BoardDetail from './pages/BoardDetail';
import { RiSteamFill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function App() {

  return (
    <BrowserRouter>
        <AppContainer>
          <nav>
            <Link to="/" className="nav-link"><RiSteamFill/>MYTEAM</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/user" element={<UserRegistration />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/board" element={<BoardEnrollForm />} />
            <Route path="/board/:id" element={<BoardDetail />} />
          </Routes>
        </AppContainer>
        <ToastContainer position='top-right' autoClose={2000}/>
    </BrowserRouter>
  );
}

export default App
