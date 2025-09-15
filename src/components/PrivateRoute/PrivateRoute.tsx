import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../../context/UserContext/UserContext"

import pages from "../../data/pages"


function PrivateRoute() {
  const userContext = useUserContext()

  return (
    userContext && userContext.isAuthenticated()
      ? <Outlet />
      : <Navigate to={pages.MAIN} />
  )
}

export default PrivateRoute
