export interface TestsTemplateOptions {
  componentName: string;
  componentPath?: string;
  withAccessibilityTests?: boolean;
}

export function generateTestsTemplate(options: TestsTemplateOptions): string {
  const { componentName, componentPath = '.', withAccessibilityTests = true } = options;

  return `import { render, screen } from '@testing-library/react'
${withAccessibilityTests ? `import { axe, toHaveNoViolations } from 'jest-axe'\n\nexpect.extend(toHaveNoViolations)\n` : ''}
import { ${componentName} } from '${componentPath}'

describe('${componentName}', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<${componentName} />)
    expect(baseElement).toBeTruthy()
  })
${withAccessibilityTests ? `
  it('should have no accessibility violations', async () => {
    const { container } = render(<${componentName} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
` : ''}
  // Add more tests here
})
`;
}
