import Container from '../../ui/Container.styled';
import * as S from './CourseDescription.styled';
import {
  IconTextBlock,
  IconImage,
  IconText,
} from '../../ui/IconTextBlock.styled';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useContext } from 'react';
import { getCourseImage } from '../../utils/getCourseImage/getCourseImage';
import FooterContent from '../FooterContent/FooterContent';
import { toast } from 'react-toastify';
import { addFavoriteCourse, removeFavoriteCourse } from '../../services/api';
import { RoutesApp } from '../../const';
import { AuthContext } from '../../context/AuthContext';
import { MainCourseContext } from '../../context/MainCourseContext ';
import Spinner from '../Spinner/Spinner';
import { handleAxiosError } from '../../utils/handleAxiosError/handleAxiosError';

function CourseDescription() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const mainContext = useContext(MainCourseContext);

  if (!mainContext) return null;

  const { course, getCourseById, loadingCourse, usersData, getAllUsersData } =
    mainContext;

  useEffect(() => {
    if (courseId) getCourseById(courseId);

    if (token) {
      getAllUsersData();
    }
  }, [courseId, getCourseById, getAllUsersData, token]);

  const userCourses = usersData?.user?.selectedCourses ?? [];
  const isUserHasCourse =
    !!courseId && userCourses.some((c: any) => String(c) === String(courseId));

  const handleFooterButtonClick = useCallback(async () => {
    if (!courseId) return;

    if (!token) {
      navigate(RoutesApp.SIGN_IN);
      return;
    }

    try {
      const currentUserCourses = usersData?.user?.selectedCourses ?? [];
      const has = currentUserCourses.some(
        (c: any) => String(c) === String(courseId)
      );

      if (has) {
        const message = await removeFavoriteCourse(token, courseId);
        toast.success(message);
      } else {
        const message = await addFavoriteCourse(token, courseId);
        toast.success(message);
      }

      // Обновляем данные пользователя (если getAllUsersData возвращает промис — ждём)
      await getAllUsersData();
    } catch (err: any) {
      // Если при добавлении сервер отвечает, что курс уже есть — показываем понятный тост.
      // Попытка детектировать - 409 или текст ошибки, иначе пробрасываем в общий обработчик.
      if (!isUserHasCourse) {
        // это попытка добавить — если сервер скажет, что уже добавлен
        toast.error('Курс уже был добавлен!');
      } else {
        handleAxiosError(err);
      }
    }
  }, [courseId, token, usersData, getAllUsersData, navigate, isUserHasCourse]);

  if (loadingCourse) {
    return <Spinner />;
  }

  if (!course) {
    return <div>Курс не найден</div>;
  }

  const { nameEN, fitting, directions } = course;
  const basePath = getCourseImage(nameEN);
  const images = {
    desktop: `/${basePath}_big.png`,
    mobile: `/${basePath}.png`,
  };

  const footerButtonText = !token
    ? 'Войдите, чтобы добавить курс'
    : isUserHasCourse
      ? 'Удалить курс'
      : 'Добавить курс';

  return (
    <>
      <Container>
        <S.DescriptionBlock>
          <S.CourseImage $desktop={images.desktop} $mobile={images.mobile} />

          <S.Title>Подойдет для вас, если:</S.Title>
          <S.SuggestionsBlock>
            {fitting.map((fit: string, index: number) => (
              <S.Suggestion key={index}>
                <S.SuggestionNumber>{index + 1}</S.SuggestionNumber>
                <S.SuggestionText>{fit}</S.SuggestionText>
              </S.Suggestion>
            ))}
          </S.SuggestionsBlock>
        </S.DescriptionBlock>
        <S.DirectionsBlock>
          <S.Title>Направления</S.Title>
          <S.Directions>
            {directions.map((direction: string, index: number) => (
              <IconTextBlock key={index}>
                <IconImage src="/Sparcle.svg" />
                <IconText>{direction}</IconText>
              </IconTextBlock>
            ))}
          </S.Directions>
        </S.DirectionsBlock>
        <S.FooterCourseDiscription>
          <FooterContent
            onClick={handleFooterButtonClick}
            text={footerButtonText}
          />
          <S.FooterImageBlock>
            <S.FooterImageLine src="/greenLine.svg" alt="curve" />
            <S.FooterImage src="/footerImg.png" alt="person" />
          </S.FooterImageBlock>
        </S.FooterCourseDiscription>
      </Container>
      <S.MobileFooter>
        <S.MobileImage src="/footerImg.png" />
        <Container>
          <S.MobileCard>
            <FooterContent
              onClick={handleFooterButtonClick}
              text={footerButtonText}
            />
          </S.MobileCard>
        </Container>
      </S.MobileFooter>
    </>
  );
}

export default CourseDescription;