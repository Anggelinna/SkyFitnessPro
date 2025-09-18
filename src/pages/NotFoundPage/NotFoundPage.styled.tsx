import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background: rgba(95, 91, 91, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Block = styled.div`
  text-align: center;
  background: #fff;
  padding: 60px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

export const Title = styled.h1`
  font-size: 72px;
  font-weight: 900;
  color: #1a3965;
  margin-bottom: 10px;
`;

export const SubTitle = styled.p`
  font-size: 18px;
  color: #66768f;
  margin-bottom: 30px;
`;