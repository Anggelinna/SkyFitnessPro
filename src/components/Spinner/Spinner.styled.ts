import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  gap: 20px;
`;

export const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 10px solid rgba(0, 0, 0, 0.1);
  border-top: 10px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
    border-width: 14px;
  }

  @media (min-width: 1200px) {
    width: 150px;
    height: 150px;
    border-width: 18px;
  }
`;

export const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;