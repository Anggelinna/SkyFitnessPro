import { sharedStyles } from "../../sharedStyles"
import Card from "../../components/Card/Card"
import Climber from "../../components/Climber/Climber"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useRef, useState, useEffect } from "react"
import { Outlet, useLoaderData } from "react-router-dom"
import { useUserContext } from "../../context/UserContext/UserContext"
import { CoursesType, CourseType } from "../../types/types"

export default function MainPage() {
  const initialCourses = useLoaderData() as CoursesType
  const topRef = useRef<HTMLDivElement>(null)
  const userContext = useUserContext()
  const [coursesData, setCoursesData] = useState<CoursesType>(initialCourses)

  // Обновляем состояние при изменении initialCourses
  useEffect(() => {
    setCoursesData(initialCourses)
  }, [initialCourses])

  function handleGettingTop() {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Функция для обновления состояния курса после действий
  const handleCourseActionComplete = (courseId: string) => {
    setCoursesData(prevCourses =>
      prevCourses.map(course =>
        course._id === courseId
          ? { ...course, isAdded: !course.isAdded }
          : course,
      ),
    )
  }

  return (
  <div className={sharedStyles.wrapper} ref={topRef}>
    <div className={sharedStyles.container}>
      <Header />
      <main>
        <section>
          <div className={sharedStyles.caption}>
              <h2 className={sharedStyles.captionText}>
                Начните заниматься спортом и улучшите качество жизни
              </h2>

              <div className={sharedStyles.captionBalloon}>
                <img
                  className={sharedStyles.captionBalloonTail}
                  src="/img/tail.svg"
                  alt="tail"
                />
                <p className={sharedStyles.captionBalloonFace}>
                  Измени своё тело за полгода!
                </p>
              </div>
            </div>

          <div className={sharedStyles.cards}>
            {coursesData.map((course, index) => (
              <Card key={course._id || index} courseData={course} userId={userContext.uid} />
            ))}
          </div>
        </section>

        <Climber onGettingTop={handleGettingTop} />
      </main>
    </div>

    <Footer />
    <Outlet />
  </div>
)
}