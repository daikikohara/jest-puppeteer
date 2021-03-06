describe('toSelect', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:4444')
  })

  it('should select an option using value', async () => {
    await expectPage().toSelect('select[name="my-select"]', 'opt1')
    const currentValue = await page.evaluate(
      () => document.querySelector('select[name="my-select"]').value,
    )
    expect(currentValue).toBe('opt1')
  })

  it('should select an option using text', async () => {
    await expectPage().toSelect('select[name="my-select"]', 'Option 2')
    const currentValue = await page.evaluate(
      () => document.querySelector('select[name="my-select"]').value,
    )
    expect(currentValue).toBe('opt2')
  })

  it('should return an error if option is not found', async () => {
    expect.assertions(2)

    try {
      await expectPage().toSelect('select[name="my-select"]', 'Another world')
    } catch (error) {
      expect(error.message).toMatch(
        'Option not found "select[name="my-select"]" ("Another world")',
      )
    }
  })
})
