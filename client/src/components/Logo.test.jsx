import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import Logo from './Logo'

describe('Logo component', () => {
  it('renders icon and text', () => {
    render(<Logo name="CryptChat" size={40} />)
    expect(screen.getByTitle('CryptChat')).toBeInTheDocument()
    expect(screen.getByText(/Crypt/i)).toBeInTheDocument()
    expect(screen.getByText(/Chat/i)).toBeInTheDocument()
  })

  it('can hide text', () => {
    render(<Logo name="CryptChat" size={40} showText={false} />)
    expect(screen.getByTitle('CryptChat')).toBeInTheDocument()
    expect(screen.queryByText(/Crypt/i)).toBeNull()
  })
})
