import { useLocation, useNavigate } from "react-router-dom"


export function useNavigateFaraway() {
  const location = useLocation()
  const navigate = useNavigate()

  function doNavigate(nextPath: string) {
    const path = location.pathname.split("/")

    if (!path[path.length - 1])
      path[path.length - 1] = nextPath
    else
      path.push(nextPath)

    navigate(path.join("/"))
  }

  return doNavigate
}
