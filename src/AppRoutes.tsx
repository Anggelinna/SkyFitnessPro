import CoursePage from "./pages/CoursePage/CoursePage"
import ExercisePage from "./pages/ExercisePage/ExercisePage"
import ExercisesListPage from "./pages/ExercisesListPage/ExercisesListPage"
import MainPage from "./pages/MainPage/MainPage"
import Page404 from "./pages/Page404/Page404"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import SigningModal from "./pages/SigningModal/SigningModal"
import WriteProgressPage from "./pages/WriteProgressPage/WriteProgressPage"

import { createBrowserRouter, NonIndexRouteObject, RouterProvider } from "react-router-dom"
import { UserContextValue, useUserContext } from "./context/UserContext/UserContext"
import pages from "./data/pages"

import { coursesAPI } from "./api/coursesApi"

const signingRouterData = [
  {
    path: pages.SIGN_IN,
    element: <SigningModal mode="signIn" />,
  },
  {
    path: pages.SIGN_UP,
    element: <SigningModal mode="signUp" />,
  },
  {
    path: pages.SIGN_OUT,
    element: <SigningModal mode="signOut" />,
  },
  {
    path: pages.SIGNING,
    element: <SigningModal mode="signIn" />,
  },
]

const choosingTrainRouterData = (userContext: UserContextValue): NonIndexRouteObject => ({
  path: pages.CHOOSE,
  element: <ExercisesListPage />,
  async loader({ params }) {
    if (params.id) {
      return coursesAPI.getWorkoutsIntoCourse(params.id, userContext.uid)
    }
    return []
  },
})

const router = (userContext: UserContextValue) => createBrowserRouter([
  {
    path: pages.MAIN,
    element: <MainPage />,
    loader: async () => coursesAPI.getCourses(userContext.uid),
    children: [...signingRouterData, choosingTrainRouterData(userContext)],
  },
  {
    path: pages.COURSES,
    element: <MainPage />,
    loader: async () => coursesAPI.getCourses(userContext.uid),
    children: [...signingRouterData, choosingTrainRouterData(userContext)],
  },
  {
    path: pages.COURSE,
    element: <CoursePage />,
    async loader({ params }) {
      if (params.id) {
        return coursesAPI.getCourse(params.id, userContext.uid)
      }
      return null
    },
    children: [...signingRouterData, choosingTrainRouterData(userContext)],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: pages.WORKOUT,
        element: <ExercisePage />,
        async loader({ params }) {
          if (params.courseId && params.workoutId) {
            return coursesAPI.getWorkout(params.courseId, params.workoutId, userContext.uid)
          }
          return null
        },
        children: [{
          path: pages.WRITE,
          element: <WriteProgressPage />,
          async loader({ params }) {
            if (params.courseId && params.workoutId) {
              return coursesAPI.getWorkout(params.courseId, params.workoutId, userContext.uid)
            }
            return null
          },
        }],
      },
      {
        path: pages.PROFILE,
        element: <ProfilePage />,
        async loader() {
          return coursesAPI.getCourses(userContext.uid)
        },
        children: [choosingTrainRouterData(userContext)],
      },
    ],
  },
  {
    path: pages.NOT_FOUND,
    element: <Page404 />,
  },
])

export default function AppRoutes() {
  const userContext = useUserContext()

  return <RouterProvider router={router(userContext)} />
}