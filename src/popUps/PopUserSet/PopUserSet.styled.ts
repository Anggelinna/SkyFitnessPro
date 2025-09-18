import styled from 'styled-components';
import { Button, SecondaryButton } from '../../ui/Button.styled';

type PopUserProps = {
  $isOpen: boolean;
};

export const PopUserSet = styled.div<PopUserProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: absolute;
  top: 60px;
  right: 0;
  width: 266px;
  height: 258px;
  border-radius: 30px;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  text-align: center;
  z-index: 2;
  background: white;
`;

export const UserName = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
`;

export const UserMail = styled.p`
  color: rgba(153, 153, 153, 1);
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 34px;
`;

export const PopUserButton = styled(Button)`
  width: 206px;
  height: 52px;
  border-width: 1px;
  padding-top: 16px;
  padding-right: 26px;
  padding-bottom: 16px;
  padding-left: 26px;
`;
export const PopUserSecondaryButton = styled(SecondaryButton)`
  width: 206px;
  height: 52px;
  border-width: 1px;
  padding-top: 16px;
  padding-right: 26px;
  padding-bottom: 16px;
  padding-left: 26px;
  margin-bottom: 10px;
`;