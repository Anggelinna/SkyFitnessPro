import * as S from './Progress.styled';

type ProgressProps = {
  percent: number;

};

const Progress: React.FC<ProgressProps> = ({ percent }) => {
  return (
    <S.ProgressBlock>
      <S.ProgressText>
        { `Прогресс ${percent}%`}
      </S.ProgressText>
      <S.ProgressBar type="range" value={percent} max={100} readOnly />
    </S.ProgressBlock>
  );
};

export default Progress;