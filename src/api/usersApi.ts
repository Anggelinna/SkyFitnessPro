import { signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { createUserWithEmailAndPassword } from "firebase/auth/cordova"
import { auth } from "./firebaseConfig"


export const usersApi = {
  async create(email: string, password: string, name: string) {
    const signUp = await createUserWithEmailAndPassword(auth, email, password)
    const user   = signUp.user

    await updateProfile(user, { displayName: name })
    await signOut(auth)

    return user
  },

  async auth(email: string, password: string) {
    const signIn = await signInWithEmailAndPassword(auth, email, password)
    const user   = signIn.user

    return user
  },
}
