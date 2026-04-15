import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { generateToken } from './utils.js'
import jwt from 'jsonwebtoken'

describe('server utils', () => {
  const OLD = process.env.JWT_SECRET
  beforeEach(() => {
    process.env.JWT_SECRET = 'testsecret'
  })
  afterEach(() => {
    process.env.JWT_SECRET = OLD
  })

  it('generateToken returns a valid JWT', () => {
    const token = generateToken('abc123')
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    expect(payload.userId).toBe('abc123')
  })
})
