import { sharedStyles } from "../../sharedStyles"

import Button from "../Button/Button"

import { MouseEventHandler } from "react"


interface Props {
  onGettingTop: MouseEventHandler<HTMLButtonElement>
}

export default function Climber({ onGettingTop }: Props) {
  return (
    <div className={sharedStyles.climber}>
      <Button primary={true} additionalClasses={sharedStyles.climberBtn} onClick={onGettingTop}>
        Наверх &#8593;
      </Button>
    </div>
  )
}