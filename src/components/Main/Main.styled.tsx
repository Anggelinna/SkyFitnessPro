import styled from 'styled-components';
import { Button } from '../../ui/Button.styled';

export const TitleBlock = styled.div`
  display: flex;

  margin-bottom: 50px;
  @media (max-width: 768px) {
    margin-bottom: 34px;
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  font-style: Medium;
  font-size: 60px;
  line-height: 100%;
  letter-spacing: 0px;
  @media (max-width: 768px) {
    font-weight: 500;
    font-size: 32px;
    letter-spacing: 0px;
  }
`;

export const TitleImg = styled.img`
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Footer = styled.div`
  max-height: 167px;
  color: #222;
  padding: 20px;
  text-align: center;
  @media (max-width: 768px) {
    text-align: end;
    padding: 0px;
  }
`;

export const FooterButton = styled(Button)`
  max-width: 172px;
  padding-top: 16px;
  padding-right: 26px;
  padding-bottom: 16px;
  padding-left: 26px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;