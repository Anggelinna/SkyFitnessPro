import { sharedStyles } from "../../sharedStyles"

import TabletDifficulty from "./TabletDifficulty"

import { ButtonHTMLAttributes } from "react"


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  imgName:     "calendar" | "time" | "difficulty"
  difficulty?: number
}

export default function Tablet({ ...props }: Props) {
  return (
    <div className={sharedStyles.cardTablet}>
      {
        props.imgName === "calendar"
          ? (
            <img src="/img/calendar.svg" alt="calendar" />
          )
        : props.imgName === "time"
          ? (
            <img src="/img/time.svg" alt="time" />
          )
          : (
            <TabletDifficulty level={props.difficulty || 1} />
          )
      }

      <p className={sharedStyles.cardTabletText}>
        {props.imgName === "difficulty" ? "Сложность" : props.children}
      </p>
    </div>
  )
}