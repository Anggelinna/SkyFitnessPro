import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"

import Button from "../Button/Button"

import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/UserContext/UserContext"
import pages from "../../data/pages"


interface Props {
  email: string
}

export default function UserMenu({ email }: Props) {
  const navigate = useNavigate()
  const userContext = useUserContext()

  function handleOpenProfile() {
    navigate(pages.PROFILE)
  }

  function handleSignOut() {
    userContext.clear()
  }

  return (
    <div className={twMerge(sharedStyles.userMenu, sharedStyles.shadowedBlock)}>
      <p className={sharedStyles.userMenuEmail}>{email}</p>

      <div className={sharedStyles.userMenuButtons}>
        <Button primary={true} additionalClasses={sharedStyles.buttonWideWithFields} onClick={handleOpenProfile}>
          Мой профиль
        </Button>
        <Button primary={false} additionalClasses={sharedStyles.buttonWideWithFields} onClick={handleSignOut}>
          Выйти
        </Button>
      </div>
    </div>
  )
}
