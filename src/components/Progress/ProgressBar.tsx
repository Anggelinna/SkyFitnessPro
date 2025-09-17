import { sharedStyles } from "../../sharedStyles"


interface Props {
  progress: number
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className={sharedStyles.progressBar}>
      <div className={sharedStyles.progressBarBack} />
      <div className={sharedStyles.progressBarFront} style={{ width: `${progress}%` }} />
    </div>
  )
}