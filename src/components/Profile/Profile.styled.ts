import styled from 'styled-components';
import { IconTextBlock } from '../../ui/IconTextBlock.styled';
import { SecondaryButton } from '../../ui/Button.styled';

export const Title = styled.h3`
  font-weight: 600;
  font-size: 40px;
  letter-spacing: 0px;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-family: Roboto;
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

export const ProfilCard = styled.div`
  height: 257;
  border-radius: 30px;
  padding: 30px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  margin-bottom: 60px;
  @media (max-width: 768px) {
    max-width: 343px;
    height: 365px;
    padding: 0px;
    margin-bottom: 24px;
  }
`;

export const ImageTextBlock = styled(IconTextBlock)`
  gap: 33px;
  max-width: 530px;
  @media (max-width: 768px) {
    max-width: 343px;
    gap: 0px;
    height: 365px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ProfilIeImg = styled.img`
  @media (max-width: 768px) {
    width: 141px;
    height: 141px;
    margin-bottom: 30px;
  }
`;

export const ProfilInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.p`
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 32px;

  letter-spacing: 0px;
  color: rgba(0, 0, 0, 1);
  @media (max-width: 768px) {
    margin-bottom: 20px;
    font-size: 24px;
  }
`;

export const UserLogin = styled.p`
  margin-bottom: 44px;
  font-weight: 400;
  font-size: 18px;

  letter-spacing: 0px;
  @media (max-width: 768px) {
    margin-bottom: 20px;
    font-size: 16px;
  }
`;

export const UserButton = styled(SecondaryButton)`
  max-width: 192px;
  height: 52px;
  @media (max-width: 768px) {
    font-size: 16px;
    height: 50px;
  }
`;