import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"
import Button from "../Button/Button"
import UserMenu from "../UserMenu/UserMenu"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/UserContext/UserContext"
import { useNavigateFaraway } from "../../hooks/useNavigateFaraway"
import pages from "../../data/pages"


export default function Header() {
  const refProfileImg = useRef<HTMLDivElement | null>(null)
  const userContext = useUserContext()
  const navigate = useNavigate()
  const navigateFaraway = useNavigateFaraway()
  const [isUserOpened, setIsUserOpened] = useState(false)


  function handleMAIN() {
    navigate(pages.MAIN)
  }

  function handleAuth() {
    navigateFaraway(pages.SIGN_IN)
  }

  function handleToggleUserMenu() {
    setIsUserOpened((prev) => !prev)
  }

  function handleOpenProfile() {
    if (refProfileImg.current?.clientHeight === 36)
      navigate(pages.PROFILE)
  }

  return (
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerContainer}>
        <img className={sharedStyles.headerLogo} onClick={handleMAIN} src="/img/logo.svg" alt="logo" />
        <p className={twMerge(sharedStyles.headerSlogan, sharedStyles.text_18_20)}>Онлайн-тренировки для занятий дома</p>
      </div>

      {
        userContext.isAuthenticated()
          ? (
            <div className={sharedStyles.headerUserGroup} onClick={handleOpenProfile}>
              <img className={sharedStyles.headerProfileLogo} ref={refProfileImg} src="/img/person-fine.svg" alt="person" />
              <div className={twMerge(sharedStyles.headerProfileBlock)} onClick={handleToggleUserMenu}>
                <span className={sharedStyles.headerProfileName}>{userContext.email}</span>
                <div className={twMerge(sharedStyles.headerProfileNameBtn, isUserOpened && sharedStyles.headerProfileNameBtnReversed)} />
              </div>
              <div className={twMerge(sharedStyles.headerProfileBlockSmall)}>
                <div className={twMerge(sharedStyles.headerProfileNameBtn, isUserOpened && sharedStyles.headerProfileNameBtnReversed)} />
              </div>

              {
                isUserOpened
                && (
                  <UserMenu email={userContext.email || ""} />
                )
              }
            </div>
          )
          : (
            <Button primary={true} onClick={handleAuth}>Войти</Button>
          )
      }
    </header>
  )
}
