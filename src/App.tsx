import './App.css';
import { GlobalStyle } from './Global.styled';
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <ToastContainer autoClose={1500} />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;