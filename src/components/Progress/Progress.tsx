import { sharedStyles } from "../../sharedStyles"

import ProgressBar from "./ProgressBar"


interface Props {
  title:    string
  progress: number
}

export default function Progress({ title, progress }: Props) {
  return (
    <div className={sharedStyles.progress}>
      <p className={sharedStyles.text_18_20}>{title || "Прогресс"} {progress}%</p>

      <ProgressBar progress={Math.max(1, progress)} />
    </div>
  )
}
