import styled from 'styled-components';
import { AuthWrapper, FormFields } from '../../ui/Form.styled';

export const ProgressWrapper = styled(AuthWrapper)`
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  max-width: 426px;
`;

export const ProgressFormFields = styled(FormFields)`
  min-width: 300px;
`;

export const ProgressFormTitle = styled.h4`
  font-weight: 400;
  font-size: 32px;
  margin-bottom: 48px;
`;

export const InputText = styled.p`
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 2px;
  display: block;
`;