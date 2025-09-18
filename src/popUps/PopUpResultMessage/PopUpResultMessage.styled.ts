import styled from 'styled-components';
import { Link } from 'react-router-dom';

type PopUpWrapperProps = {
  $isOpen: boolean;
};

export const PopUpWrapper = styled.div<PopUpWrapperProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
`;

export const MessageBlock = styled.div`
  width: 426px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 30px;
  padding: 40px;
  gap: 1px;
`;

export const SuccessMessage = styled.h2`
  font-weight: 600;
  font-size: 40px;
  text-align: center;
  margin-bottom: 24px;
`;

export const SuccessImage = styled.img`
  width: 68px;
  height: 68px;
  margin-bottom: 24px;
`;

export const BaseLinkStyle = `
  display: block;
  margin: 8px 0;
  color: #0077ff;
  text-decoration: none;

  cursor: pointer;
  background: none;
  border: none;
  font-size: 16px;

  &:hover {
    color: #0056cc;
    text-decoration: underline;
  }
`;

export const StyledLink = styled(Link)`
  ${BaseLinkStyle}
`;

export const StyledButton = styled.button`
  ${BaseLinkStyle}
`;