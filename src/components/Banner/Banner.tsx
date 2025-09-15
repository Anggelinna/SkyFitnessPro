import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"

import type { KeysType, CourseType } from "../../types/types"


interface Props {
  courseData: CourseType
}

export default function Banner({ courseData }: Props) {
  const { name, title } = courseData

  const classNames = twMerge(
    sharedStyles.bannerPicture,
    sharedStyles[(`card-${name}`) as KeysType],
    sharedStyles[(`banner-${name}`) as KeysType],
  )

  return (
    <div className={twMerge(sharedStyles.banner, `bg-${name}`)}>
      <img className={classNames} src={`/img/${name}.jpeg`} alt={name} />
      <p className={sharedStyles.bannerText}>{title}</p>
    </div>
  )
}
