import { sharedStyles } from "../../sharedStyles"

import { Link } from "react-router-dom"
import pages from "../../data/pages"


export default function Page404() {
  return (
    <div className={sharedStyles.page404Container}>
      <img className={sharedStyles.page404Image} src="/img/404.png" alt="404" />

      <div className={sharedStyles.page404TextBlock}>
        <h3 className={sharedStyles.page404Title}>Страница не найдена</h3>
        <p className={sharedStyles.page404Description}>
          Страница, на которую Вы перешли, не найдена. Возможно, Вы ввели неправильный адрес, или страница была перемещена.
        </p>
        <Link to={pages.MAIN}>Перейти на главную</Link>
      </div>
    </div>
  )
}