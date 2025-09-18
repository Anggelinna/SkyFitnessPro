import styled from 'styled-components';
import { Button } from '../../ui/Button.styled';

export const Header = styled.header`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;

  @media (max-width: 1024px) {
    padding: 40px 15px;
  }

  @media (max-width: 1025px) {
    padding: 45px 20px;
  }

  @media (max-width: 768px) {
    padding: 40px 0px;
  }
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoImg = styled.img`
  width: 220px;
  height: 35px;

  @media (max-width: 768px) {
    width: 200px;
    height: 35px;
  }
`;

export const LogoText = styled.p`
  font-weight: 400;

  font-size: 18px;
  letter-spacing: 0px;
  @media (max-width: 900px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  @media (max-width: 768px) {
    gap: 0px;
  }
`;

export const ProfileButton = styled.button`
  font-weight: 400;
  font-size: 24px;
  color: rgba(0, 0, 0, 1);
  letter-spacing: 0px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-left: 1.9px solid rgba(0, 0, 0, 1);
    border-bottom: 1.9px solid rgba(0, 0, 0, 1);
    transform: rotate(-45deg);
    margin-left: 4px;
  }

  @media (max-width: 768px) {
    font-size: 0;
    width: 24px;
    height: 24px;
    margin-left: 0;
    padding: 0;

    &::after {
      width: 6px;
      height: 6px;
      border-left: 1.9px solid rgba(0, 0, 0, 1);
      border-bottom: 1.9px solid rgba(0, 0, 0, 1);
      transform: rotate(-45deg);
    }
  }
`;

export const HeaderButton = styled(Button)`
  max-width: 103px;

  @media (max-width: 768px) {
    padding-top: 8px 16px;
  }
`;