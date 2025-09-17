import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"

import { ButtonHTMLAttributes } from "react"


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary:            boolean
  additionalClasses?: string
}

export default function Button({ primary, additionalClasses, ...props }: Props) {
  const classNames = twMerge(
    sharedStyles.buttonCommon,
    sharedStyles.text_18_20,
    primary
      ? sharedStyles.buttonPrimary
      : sharedStyles.buttonSecondary,
    additionalClasses,
  )

  return (
    <button type="button" className={classNames} {...props} />
  )
}