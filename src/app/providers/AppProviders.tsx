import React from 'react'
import { RendererProvider, createDOMRenderer } from '@griffel/react'
import { ThemeProvider } from './ThemeProvider'

const renderer = createDOMRenderer()

interface AppProvidersProps {
  children: React.ReactNode
}

/**
 * Root composition provider for Griffel CSS renderer, theme, and global state.
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider>{children}</ThemeProvider>
    </RendererProvider>
  )
}
