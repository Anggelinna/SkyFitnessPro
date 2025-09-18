import styled from 'styled-components';

export const IconTextBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 284px;
`;

export const IconImage = styled.img`
  width: 26px;
  height: 26px;
`;

export const IconText = styled.p`
  font-weight: 400;
  font-size: 24px;

  @media (max-width: 768px) {
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0px;
  }
`;