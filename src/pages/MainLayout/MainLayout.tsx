import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Wrapper } from './MainLayout.styled';

function MainLayout() {
  return (
    <Wrapper>
      <Header showMoto />
      <Outlet />
    </Wrapper>
  );
}

export default MainLayout;