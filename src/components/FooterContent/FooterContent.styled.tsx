import styled from 'styled-components';
import { Button } from '../../ui/Button.styled';

export const ContentBlock = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding: 40px;
  @media (max-width: 768px) {
    padding: 30px;
    align-items: center;
  }
`;

export const FooterTitle = styled.h2`
  font-weight: 500;
  font-size: 60px;
  line-height: 100%;
  color: #000;
  margin-bottom: 25px;
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 110%;
  }
`;

export const FooterList = styled.ul`
  list-style-position: inside;
  margin-bottom: 28px;
  color: rgba(0, 0, 0, 0.6);

  li {
    font-weight: 400;
    font-size: 24px;
    line-height: 110%;
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  li + li {
    margin-top: 8px;
    @media (max-width: 768px) {
      margin-top: 9px;
    }
  }
`;
export const FooterButton = styled(Button)`
  width: 437px;
  height: 52px;
  opacity: 1;
  @media (max-width: 768px) {
    width: 283px;
    height: 50px;
    font-weight: 400;
    font-size: 16px;
  }
`;