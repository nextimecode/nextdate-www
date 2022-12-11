import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  User as FirebaseUser,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth'
import { auth } from '../services/firebase'
import api from '../services/api'

export const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const updateUser = (user: any, displayName: string) => {
    return updateProfile(user, { displayName })
  }

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email: string, password: string) => {
    try {
      setPersistence(auth, browserSessionPersistence)
      return signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      return error
    }
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  const authDeleteUser = async (userProvidedPassword: string) => {
    if (auth.currentUser && auth.currentUser.email) {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, userProvidedPassword)
      const response: any = await reauthenticateWithCredential(auth.currentUser, credential)
      await deleteUser(auth.currentUser)
      await api.delete('users', {
        headers: {
          Authorization: response.user.accessToken
        }
      })
    }
  }

  const emailVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser)
    } else {
      return 'Not current user'
    }
  }

  const passResetWithEmail = async (email: string) => {
    return await sendPasswordResetEmail(auth, email).then(() => true)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        passResetWithEmail,
        updateUser,
        authDeleteUser,
        emailVerification
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
