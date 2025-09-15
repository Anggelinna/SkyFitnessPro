import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"
import Button from "../../components/Button/Button"
import Header from "../../components/Header/Header"
import Progress from "../../components/Progress/Progress"
import { Link, Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { useNavigateFaraway } from "../../hooks/useNavigateFaraway"
import { useUserContext } from "../../context/UserContext/UserContext"
import { WorkoutType } from "../../types/types"
import pages from "../../data/pages"
import { getRate } from "../../utils/progress"
import { coursesAPI } from "../../api/coursesApi"
import Footer from "../../components/Footer/Footer"


export default function ExercisePage() {
  const { courseId, workoutId } = useParams()
  const workoutData = useLoaderData() as WorkoutType
  const userContext = useUserContext()
  const navigate = useNavigate()
  const navigateFaraway = useNavigateFaraway()

  if (!workoutData)
    return "There is an error!"

  async function handleSubmit() {
    if (workoutData.exercises)
      return navigateFaraway(pages.WRITE)

    coursesAPI.writeProgressToUserCourse(userContext.uid, courseId, workoutId, 1)

    navigate(pages.PROFILE)
  }

  return (
    <div className={sharedStyles.wrapper}>
      <div className={sharedStyles.container}>
        <Header />

        <main className="">
          <section className="">
            <h1 className={sharedStyles.videoText}>{workoutData.courseName}</h1>

            <div className={sharedStyles.breadcrumbsLine}>
              <Link className={sharedStyles.breadcrumb} to="/">Красота и здоровье</Link>
              &nbsp;/&nbsp;
              <Link className={sharedStyles.breadcrumb} to={`/courses/${courseId}/`}>{workoutData.courseName} на каждый день</Link>
              &nbsp;/&nbsp;
              <span className={sharedStyles.breadcrumbLast}>{workoutData.day} день</span>
            </div>

            <div className={sharedStyles.videoBlock}>
              <iframe className="" width="100%" height="100%" src={workoutData.video} title="YouTube player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          </section>

          <section className={twMerge(sharedStyles.workoutProgressesBlock, sharedStyles.shadowedBlock)}>
            <p className={sharedStyles.workoutDayCaption}>Упражнения тренировки {workoutData.day}</p>

            <div className={sharedStyles.workoutProgresses}>
              {
                workoutData.exercises
                  ? (
                    <>
                      {
                        workoutData.exercises.map((exercise, index) => {
                          if (!exercise)
                            return null

                          return (
                            <Progress key={index} title={`${index + 1}) ${exercise.name}`} progress={getRate(exercise.progress, exercise.quantity)} />
                          )
                        })
                      }
                    </>
                  )
                  : (
                    <Progress title={""} progress={getRate(workoutData.progress, workoutData.max)} />
                  )
              }
            </div>

            <Button additionalClasses={sharedStyles.buttonProgress} primary={true} onClick={handleSubmit}>
              {workoutData.exercises ? "Заполнить свой прогресс" : "Завершить занятие"}
            </Button>
          </section>
        </main>
      </div>

      <Footer />

      <Outlet />
    </div>
  )
}
