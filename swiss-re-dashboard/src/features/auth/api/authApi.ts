import { httpClient } from '../../../services/http/httpClient'
import type { User } from '../../../common/types/user'

export interface LoginCredentials {
  email: string
  passcode: string
}

export const authApi = {
  async getCurrentUser(): Promise<User> {
    const res = await httpClient.get<User>('/auth/me')
    return res.data
  },

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const res = await httpClient.post<{ user: User; token: string }>('/auth/login', credentials)
    return res.data
  },

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout')
  },
}
