import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/context/ThemeContext'
import Page from '@/app/page'

describe('Page', () => {
  it('renders the sidebar heading', () => {
    render(
      <ThemeProvider>
        <TooltipProvider>
          <Page />
        </TooltipProvider>
      </ThemeProvider>
    )

    const heading = screen.getByText('Switchboard')
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })
})