const expectPuppeteer = require('expect-puppeteer')

const timeout = 25000

let webOrigin = ''

if (process.env.NODE_ENV === 'stage') {
  webOrigin = `https://${process.env_WEB_HOST}`
} else {
  webOrigin = `http://${process.env.WEB_HOST}:${process.env.WEB_PORT}`
}

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto(webOrigin + '/about')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('should load without error', async () => {
      let text = await page.evaluate(() => document.body.textContent)
      await expect(text).toContain('Podverse')
      await expectPuppeteer(page).toClick('.view__navbar .dropdown')

      await page.waitFor(10000)
    }, 50000)
  },
  timeout
)
