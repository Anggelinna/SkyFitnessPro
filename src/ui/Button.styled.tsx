import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 46px;
  gap: 10px;
  opacity: 1;
  padding-top: 16px 26px;
  background: #bcec30;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0px;
  color: #000000;
  border: none;
  margin-bottom: 10px;
`;

export const SecondaryButton = styled(Button)`
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 1);
  width: 100%;
`;