import styled from 'styled-components';

export const ProgressBlock = styled.div`
  max-width: 300px;
`;

export const ProgressText = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 110.00000000000001%;
  margin-bottom: 10px;
`;

interface ProgressProps {
  value: number; 
  max?: number;
}

export const ProgressBar = styled.input.attrs({ type: 'range' })<ProgressProps>`
  width: 100%;
  height: 6px;
  border-radius: 50px;
  appearance: none;
  cursor: pointer;

  background: ${({ value, max = 100 }) =>
    `linear-gradient(to right, #00c1ff ${(value / max) * 100}%, #eee ${(value / max) * 100}%)`};

  /* скрываем ползунок */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
  }

  &::-moz-range-thumb {
    width: 0;
    height: 0;
    border: none;
  }

  &::-ms-thumb {
    width: 0;
    height: 0;
    border: none;
  }
`;