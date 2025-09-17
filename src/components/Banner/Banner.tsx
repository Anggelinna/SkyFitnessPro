import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"
import type { KeysType, CourseType } from "../../types/types"

interface Props {
  courseData: CourseType
}

// Маппинг имен курсов к именам файлов (такой же как в Card.tsx)
const imageMapping: { [key: string]: string } = {
  yoga: 'yoga',
  stretching: 'stretching',
  zumba: 'zumba',
  aerobics: 'aerobics',
  'body-flex': 'body-flex',
  fitness: 'zumba', // Фитнес использует zumba.jpeg
  'step-aerobics': 'aerobics',
  default: '404'
}

export default function Banner({ courseData }: Props) {
  const { name, title } = courseData

  // Получаем правильное имя файла
  const imageName = imageMapping[name] || imageMapping.default
  const imagePath = `/img/${imageName}.jpeg`

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    console.error('Banner image failed to load:', target.src)
    target.src = `${window.location.origin}/img/404.png`
    target.alt = 'Изображение не найдено'
  }

  const classNames = twMerge(
    sharedStyles.bannerPicture,
    sharedStyles[(`banner-${name}`) as KeysType], // используем только banner- классы
  )

  return (
    <div className={twMerge(sharedStyles.banner, sharedStyles.colors)}>
      <img
        className={classNames}
        src={imagePath}
        alt={name}
        onError={handleImageError}
      />
      <p className={sharedStyles.bannerText}>{title}</p>
    </div>
  )
}