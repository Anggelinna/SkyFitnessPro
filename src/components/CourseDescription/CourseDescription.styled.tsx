import styled from 'styled-components';

export const DescriptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  @media (max-width: 768px) {
    margin-top: 0px;
  }
`;

export const CourseImage = styled.div<{ $desktop: string; $mobile: string }>`
  margin-bottom: 60px;

  background-image: url(${(props) => props.$desktop});
  /* background-size: cover; */
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 310px;
  @media (max-width: 768px) {
    background-image: url(${(props) => props.$mobile});
    /* width: 343px; */
    height: 325px;
    margin-bottom: 40px;
    opacity: 1;
    border-radius: 30px;
  }
`;

export const Title = styled.p`
  font-weight: 600;
  font-size: 40px;
  line-height: 110.00000000000001%;
  letter-spacing: 0px;
  @media (max-width: 768px) {
    font-family: Roboto;
    font-weight: 500;
    font-size: 24px;
  }
`;

export const SuggestionsBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 17px;
    margin-top: 17px;
  }
`;

export const Suggestion = styled.div`
  border-radius: 28px;
  opacity: 1;
  padding: 20px;
  background: linear-gradient(115.81deg, #151720 34.98%, #1e212e 91.5%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
`;

export const SuggestionNumber = styled.div`
  font-weight: 500;
  font-size: 75px;
  line-height: 135%;
  color: rgba(188, 236, 48, 1);
`;

export const SuggestionText = styled.div`
  font-weight: 400;
  font-size: 24px;
  width: 268px;
  color: white;
  @media (max-width: 768px) {
    font-weight: 400;
    font-size: 18px;
  }
`;

export const DirectionsBlock = styled(SuggestionsBlock)`
  display: flex;
  flex-direction: column;
`;

export const Directions = styled(Suggestion)`
  background: rgba(188, 236, 48, 1);
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
  @media (max-width: 768px) {
    position: relative;
    margin-top: 24px;
  }
`;

export const FooterCourseDiscription = styled.div`
  margin-top: 102px;
  margin-bottom: 50px;
  padding: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  @media (max-width: 768px) {
    display: none;
  }
`;

export const FooterImageBlock = styled.div`
  position: relative;
  display: inline-block;
`;

export const FooterImage = styled.img`
  position: relative;
  z-index: 2;
  width: 487px;

  height: auto;
  transform: rotate(-2.99deg);
  opacity: 1;
`;

export const FooterImageLine = styled.img`
  position: absolute;
  bottom: 0;
  left: -620px;
  top: 98px;
  z-index: 0; /* ниже всего */
  height: auto;
  transform: rotate(-0.3deg);
  pointer-events: none; /* <--- ВАЖНО */
`;

export const MobileFooter = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileImage = styled.img`
  width: 100%;
  margin-top: -80px; /* чтобы наехало на блок выше */
  margin-left: 97.42px;
  position: relative;
  z-index: 2;
  transform: rotate(-2.99deg);
  max-width: 343px;
  height: 348px;
`;

export const MobileCard = styled.div`
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  margin-top: -140px;
  position: relative;
  z-index: 3;
`;

export const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 283px;
`;