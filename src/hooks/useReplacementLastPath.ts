import { useLocation, useNavigate } from "react-router-dom"


export function useReplacementLastPath() {
  const location = useLocation()
  const navigate = useNavigate()

  function navigateReplaced(lastPath: string, replace?: boolean) {
    const path = location.pathname.split("/")

    if (path[path.length - 1]) {
      path[path.length - 1] = lastPath
      path.push("")
    } else {
      path[path.length - 2] = lastPath
    }

    if (replace)
      navigate(path.join("/"), { replace: true })
    else
      navigate(path.join("/"))
  }

  return navigateReplaced
}