import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface Score {
  overall: number
  income: number
  credit: number
  history: number
  employment: number
  applicationComplete: boolean
  profile: {
    name: string
    email: string
    phone: string
    occupation: string
    lastUpdated: string
    canUpdate: boolean
  }
  finances: {
    monthlyIncome: number
    monthlyExpenses: number
    currentBalance: number
    maxRent: number
    bankStatements: {
      uploaded: boolean
      lastUpdated: string | null
      months: number
    }
    lastUpdated: string
    canUpdate: boolean
  }
  verification: {
    kycComplete: boolean
    employerDataComplete: boolean
    previousRentals: number
    guarantor: {
      name: string | null
      status: string
    }
    coTenant: {
      name: string | null
      status: string
    }
    lastUpdated: string
    canUpdate: boolean
  }
}

interface AppState {
  user: User | null
  score: Score | null
  setUser: (user: User | null) => void
  setScore: (score: Score) => void
  logout: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      score: null,
      setUser: (user) => set({ user }),
      setScore: (score) => set({ score }),
      logout: () => set({ user: null, score: null }),
    }),
    {
      name: 'tenant-score-storage',
    }
  )
)