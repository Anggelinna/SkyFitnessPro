import { sharedStyles } from "../../sharedStyles"
import Button from "../../components/Button/Button"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/UserContext/UserContext"
import { useReplacementLastPath } from "../../hooks/useReplacementLastPath"
import pages from "../../data/pages"
import { ModalKindType } from "../../types/types"
import { usersApi } from "../../api/usersApi"

interface Props {
  mode: ModalKindType
}

interface ExtendedProps extends Props {
  formData: {
    email: string
    login: string
    password: string
    repeat: string
  }
  setFormData: (value: ExtendedProps["formData"]) => void
  errorState: {
    showing: boolean
    message: string
    reset: boolean
  }
  setErrorState: (value: ExtendedProps["errorState"]) => void
  onSwitch: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

interface ErrorBlockProps {
  errorState: ExtendedProps["errorState"]
  onSwitch: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
}

export default function SigningModal({ mode }: Props) {
  const [modalMode, setModalMode] = useState<ModalKindType>(mode)
  const navigate = useNavigate()
  const userContext = useUserContext()
  const navigateReplaced = useReplacementLastPath()

  const [errorState, setErrorState] = useState<ExtendedProps["errorState"]>({
    showing: false,
    message: "",
    reset: false,
  })

  const [formData, setFormData] = useState<ExtendedProps["formData"]>({
    email: "",
    login: "",
    password: "",
    repeat: "",
  })

  function handleChangeFormData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleGoAnother(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    e.preventDefault()
    setErrorState({ showing: false, message: "", reset: false })

    if (modalMode === "signIn") {
      navigateReplaced("up", true)
      setModalMode("signUp")
    } else if (modalMode === "signUp") {
      navigateReplaced("in", true)
      setModalMode("signIn")
    } else {
      throw new Error("Unknown modal state")
    }
  }

  function handleClose(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLDivElement).dataset.id === "modal-outside")
      navigate(-1)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (modalMode === "signIn") {
      try {
        const user = await usersApi.auth(formData.email, formData.password)
        userContext.save(user.accessToken, user.uid, user.email)
        navigate(pages.MAIN)
      } catch (error) {
        if (error instanceof Error)
          setErrorState({ showing: true, message: error.message, reset: false })
      }
    } else if (modalMode === "signUp") {
      try {
        const user = await usersApi.create(formData.email, formData.password, formData.email)
        navigateReplaced("in", true)
        setModalMode("signIn")
      } catch (error) {
        if (error instanceof Error)
          setErrorState({ showing: true, message: error.message, reset: false })
      }
    } else {
      throw new Error("Unknown modal state")
    }
  }

  function renderErrorBlock() {
    if (!errorState.showing) return null

    if (errorState.message.includes('почты') || errorState.message.includes('email')) {
      return (
        <p className={sharedStyles.modalFormError}>
          Указанный адрес электронной почты не идентифицирован. Проверьте ввод.<br />
          <a className={sharedStyles.modalFormSuggestionLink} href="#" onClick={handleGoAnother}>
            Зарегистрируйтесь, если впервые здесь.
          </a>
        </p>
      )
    } else if (errorState.message.includes('парол') || errorState.message.includes('password')) {
      return (
        <p className={sharedStyles.modalFormError}>
          Пароль введён неверно, попробуйте<br />ещё раз.&nbsp;
          <a className={sharedStyles.modalFormErrorLink} href="#">
            Восстановить пароль?
          </a>
        </p>
      )
    } else {
      return (
        <p className={sharedStyles.modalFormError}>
          Что-то или всё пошло не так.<br />Проверьте введённые данные.
          {errorState.message && <br />}{errorState.message}
        </p>
      )
    }
  }

  function renderModalContent() {
    return (
      <div className={sharedStyles.modalFormInner}>
        <div className={sharedStyles.modalFormSubgroup}>
          {(modalMode === "signIn" || modalMode === "signUp") && (
            <input
              className={sharedStyles.modalFormInput}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChangeFormData}
              placeholder="Электронная почта"
            />
          )}
          <input
            className={sharedStyles.modalFormInput}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChangeFormData}
            placeholder="Пароль"
            required={true}
          />
          {(modalMode === "signUp" || modalMode === "resetEnd") && (
            <input
              className={sharedStyles.modalFormInput}
              type="password"
              name="repeat"
              value={formData.repeat}
              onChange={handleChangeFormData}
              placeholder="Повтор пароля"
              required={true}
            />
          )}
        </div>

        {renderErrorBlock()}

        <div className={sharedStyles.modalFormSubgroup}>
          {modalMode === "signIn" ? (
            <>
              <Button primary={true} type="submit" additionalClasses={sharedStyles.buttonWide}>
                Войти
              </Button>
              <Button primary={false} additionalClasses={sharedStyles.buttonWide} onClick={handleGoAnother}>
                Зарегистрироваться
              </Button>
            </>
          ) : modalMode === "signUp" ? (
            <>
              <Button primary={true} type="submit" additionalClasses={sharedStyles.buttonWide}>
                Зарегистрироваться
              </Button>
              <Button primary={false} additionalClasses={sharedStyles.buttonWide} onClick={handleGoAnother}>
                Войти
              </Button>
            </>
          ) : (
            <Button primary={true} type="submit" additionalClasses={sharedStyles.buttonWide}>
              Подтвердить
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={sharedStyles.modalWrapper} data-id="modal-outside" onClick={handleClose}>
      <form className={sharedStyles.modalForm} onSubmit={handleSubmit}>
        <img className={sharedStyles.headerLogo} src="/img/logo.svg" alt="logo" />

        {mode === "resetStart" ? (
          <p>Ссылка для восстановления пароля отправлена на {formData.email}</p>
        ) : (
          renderModalContent()
        )}
      </form>
    </div>
  )
}