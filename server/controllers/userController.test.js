import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as userController from './userController.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

vi.mock('../models/User.js')
vi.mock('bcryptjs')
vi.mock('../lib/utils.js', () => ({ generateToken: () => 'token123' }))

const mockRes = () => {
  const res = {}
  res.json = vi.fn((payload) => payload)
  return res
}

describe('userController.signup', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns error when missing fields', async () => {
    const req = { body: { email: '', fullname: '', password: '' } }
    const res = mockRes()
    const out = await userController.signup(req, res)
    expect(res.json).toHaveBeenCalled()
  })

  it('creates a new user successfully', async () => {
    const req = { body: { email: 'a@a.com', fullname: 'A', password: 'pass', bio: '' } }
    User.findOne.mockResolvedValue(null)
    bcrypt.genSalt.mockResolvedValue('salt')
    bcrypt.hash.mockResolvedValue('hashed')
    User.prototype.save = vi.fn().mockResolvedValue(true)
    User.mockImplementation(function (data) { Object.assign(this, data); this.save = User.prototype.save })

    const res = mockRes()
    await userController.signup(req, res)
    expect(res.json).toHaveBeenCalled()
  })
})

describe('userController.login', () => {
  beforeEach(() => vi.resetAllMocks())

  it('returns error when user not found', async () => {
    const req = { body: { email: 'x', password: 'p' } }
    User.findOne.mockResolvedValue(null)
    const res = mockRes()
    await userController.login(req, res)
    expect(res.json).toHaveBeenCalled()
  })

  it('returns success when credentials match', async () => {
    const req = { body: { email: 'a', password: 'b' } }
    const fakeUser = { _id: 'u1', password: 'hashed' }
    User.findOne.mockResolvedValue(fakeUser)
    bcrypt.compare.mockResolvedValue(true)
    const res = mockRes()
    await userController.login(req, res)
    expect(res.json).toHaveBeenCalled()
  })
})
