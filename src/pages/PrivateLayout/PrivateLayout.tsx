import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Wrapper } from './PrivateLayout.styled';
import CourseProvider from '../../context/CourseProvider';

function PrivateLayout() {
  return (
    <Wrapper>
      <Header />
      <CourseProvider>
        <Outlet />
      </CourseProvider>
    </Wrapper>
  );
}

export default PrivateLayout;