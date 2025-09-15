import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"
import Button from "../../components/Button/Button"
import Card from "../../components/Card/Card"
import Header from "../../components/Header/Header"
import { Outlet, useLoaderData } from "react-router-dom"
import { useUserContext } from "../../context/UserContext/UserContext"
import { CoursesType } from "../../types/types"
import Footer from "../../components/Footer/Footer"


export default function ProfilePage() {
  const coursesData = useLoaderData() as CoursesType
  const userContext = useUserContext()

  function handleSignOut() {
    userContext.clear()
  }

  return (
    <div className={sharedStyles.wrapper}>
      <div className={sharedStyles.container}>
        <Header />

        <main className="">
          <section className="">
            <h2 className={twMerge(sharedStyles.captionText, sharedStyles.userProfileTitle)}>Профиль</h2>

            <div className={twMerge(sharedStyles.userProfile, sharedStyles.shadowedBlock)}>
              <img className={sharedStyles.userProfileLogo} src="/img/person-huge.svg" alt="person" />
              <form className={sharedStyles.userProfileRight}>
                <p className={sharedStyles.userProfileName}>{userContext.email}</p>
                <p className={sharedStyles.userProfileEmail}>E-mail: <span>{userContext.email}</span></p>
                <div className={sharedStyles.userProfileButtons}>
                  <Button primary={true} type="submit" additionalClasses={sharedStyles.userProfileButton}>
                    Изменить пароль
                  </Button>
                  <Button primary={false} additionalClasses={sharedStyles.userProfileButton} onClick={handleSignOut}>
                    Выйти
                  </Button>
                </div>
              </form>
            </div>
          </section>

          <section className={sharedStyles.userProfileSection}>
            <h2 className={twMerge(sharedStyles.captionText, sharedStyles.userProfileTitle)}>Мои курсы</h2>

            <div className={sharedStyles.cards}>
              {
                coursesData.filter((course) => course.isAdded).map((course, index) => (
                  <Card key={index} courseData={course} userId={userContext.uid} />
                ))
              }
            </div>
          </section>
        </main>
      </div>

      <Footer />

      <Outlet />
    </div>
  )
}
