import styled from 'styled-components';

export const Courses = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
  gap: 40px; 
  margin-bottom: 34px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;