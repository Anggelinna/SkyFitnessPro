import styled from 'styled-components';
import { AuthWrapper } from '../../ui/Form.styled';
import { Button } from '../../ui/Button.styled';

export const WorkOutWrapper = styled(AuthWrapper)`
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  max-width: 460px;
  @media (max-width: 768px) {
    max-width: 343px;
  }
`;

export const WorkOutFormTitle = styled.h4`
  font-weight: 400;
  font-size: 32px;
  margin-bottom: 38px;
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const WorkOutList = styled.div`
  max-height: 320px;
  overflow-y: auto;
  margin-bottom: 34px;
  @media (max-width: 768px) {
    max-height: 275px;
  }
`;

export const WorkOutItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  gap: 10px;
  border-bottom: 1px solid rgba(196, 196, 196, 1);
  width: 354px;
  margin-top: 10px;
  color: ${({ $isActive }) => ($isActive ? 'black' : 'rgba(168, 165, 165, 1)')};
  transition: background-color 0.2s;

  @media (max-width: 768px) {
    width: 257px;
  }
`;

export const WorkOutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WorkOutTitle = styled.span`
  font-weight: 400;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const WorkOutSubTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CheckMark = styled.img`
  width: 20px;
  height: 20px;
`;

export const WorkOutButton = styled(Button)``;