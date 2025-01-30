describe('Sample Test', () => {
  it('should demonstrate a failing test', () => {
    const add = (a: number, b: number) => a + b
    
    // This will fail
    expect(add(1, 2)).toBe(4)
    
    // This would pass
    // expect(add(1, 2)).toBe(3)
  })
}) 