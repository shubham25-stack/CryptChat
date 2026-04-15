import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { AuthProvider, AuthContext } from './AuthContext'

vi.mock('socket.io-client', () => ({
  io: () => ({ on: () => {}, disconnect: () => {} })
}))

describe('AuthContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('login stores token and sets axios header on success', async () => {
    const fakeResponse = { data: { success: true, token: 'tok123', userData: { _id: 'u1' }, message: 'ok' } }
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce(fakeResponse)

    let contextValue
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => React.useContext(AuthContext), { wrapper })

    await act(async () => {
      await result.current.login('login', { email: 'a', password: 'b' })
    })

    expect(postSpy).toHaveBeenCalled()
    expect(localStorage.getItem('token')).toBe('tok123')
    expect(axios.defaults.headers.common['token']).toBe('tok123')
  })
})
