import styled from 'styled-components';

type PopUpWorkOutProps = {
  $isOpen: boolean;
};

export const PopUpWorkOut = styled.div<PopUpWorkOutProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
`;