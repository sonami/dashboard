import { useState, useEffect } from 'react'
import type { User, UserRole } from '../../../common/types/user'
import { ROLE_PERMISSIONS } from '../utils/permissions'

const DEFAULT_USER: User = {
  id: 'usr_swissre_001',
  name: 'Marcus Vance',
  email: 'm.vance@swissre.com',
  role: 'Underwriter',
  department: 'Global Casualty Reinsurance',
  permissions: ROLE_PERMISSIONS['Underwriter'],
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

let currentState: AuthState = {
  user: DEFAULT_USER,
  isAuthenticated: true,
  isLoading: false,
}

const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((l) => l())
}

export const authStore = {
  getState: () => currentState,
  setUser: (user: User | null) => {
    currentState = {
      ...currentState,
      user,
      isAuthenticated: !!user,
    }
    notify()
  },
  setRole: (role: UserRole) => {
    if (currentState.user) {
      currentState = {
        ...currentState,
        user: {
          ...currentState.user,
          role,
          permissions: ROLE_PERMISSIONS[role] || [],
        },
      }
      notify()
    }
  },
  logout: () => {
    currentState = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }
    notify()
  },
  loginAsDemo: (role: UserRole = 'Underwriter') => {
    currentState = {
      user: {
        id: `usr_${Date.now()}`,
        name: `${role} Analyst`,
        email: `${role.toLowerCase()}@swissre.com`,
        role,
        department: 'Reinsurance Solutions',
        permissions: ROLE_PERMISSIONS[role],
      },
      isAuthenticated: true,
      isLoading: false,
    }
    notify()
  },
}

export function useAuthStore() {
  const [state, setState] = useState<AuthState>(authStore.getState())

  useEffect(() => {
    const update = () => setState(authStore.getState())
    listeners.add(update)
    return () => {
      listeners.delete(update)
    }
  }, [])

  return {
    ...state,
    setUser: authStore.setUser,
    setRole: authStore.setRole,
    logout: authStore.logout,
    loginAsDemo: authStore.loginAsDemo,
  }
}
