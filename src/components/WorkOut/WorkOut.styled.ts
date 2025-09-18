import styled from 'styled-components';
import { Button } from '../../ui/Button.styled';

export const Title = styled.h2`
  font-weight: 500;
  font-size: 60px;
  line-height: 100%;
  letter-spacing: 0px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-weight: 500;

    font-size: 36px;
  }
`;

// WorkOut.styled.ts
export const VideoCourse = styled.iframe`
  width: 100%;
  max-width: 1160px;
  aspect-ratio: 16 / 9; /* сохраняем пропорции */
  border: none;
  margin-bottom: 40px;
`;

export const CourseProgressBlock = styled.div`
  width: 100%;
  background-color: white;
  padding: 40px;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  margin-bottom: 40px;
  border-radius: 30px;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const CourseProgressTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 32px;
  line-height: 110.00000000000001%;
  @media (max-width: 768px) {
    font-weight: 400;
    font-size: 24px;
  }
`;

export const CourseProgressBox = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 20px;
  column-gap: 60px;
`;

export const CourseProgressButton = styled(Button)`
  max-width: 320px;
  font-weight: 400;
  font-size: 18px;
`;

export const ProgressBlock = styled.div`
  max-width: 300px;
`;

export const ProgressText = styled.p`
  font-weight: 400;
  font-size: 18px;
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

export const WorkOutsButton = styled(Button)`
  max-width: 320px;
  @media (max-width: 768px) {
    max-width: 283px;
    font-weight: 400;
    font-size: 12px;
  }
`;