import { test, expect } from '@playwright/test'
import data from '../fixtures/data'
import login from '../actions/login'
import { faker } from '@faker-js/faker'

/** @type {import('@playwright/test').Page} */
let page

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(data.APP.URL)
    await page.waitForURL(data.APP.URL)
    const Cookie = await login(page)
    await Cookie.addCookie(page)
})

test.afterEach(async () => {
    await page.close()
})

test.describe('Login', () => {
    test('Deve ser possível logar com um usuário existente', async () => {
        const user = `${data.USER.EMAIL}`
        const password = `${data.USER.PASSWORD}`
        const Login = await login(page)
        await Login.loginWithUser(user, password)
        await page.waitForURL('**/myaccount/**')
    })

    test('Não deve ser possível logar com um usuário não cadastrado', async () => {
        const user = faker.internet.userName()
        const password = faker.internet.password()
        const Login = await login(page)
        await Login.loginWithUser(user, password)
        await expect(page
            .locator('.notification-critical:has-text("Alguns dados informados estão incorretos. Tente novamente.")')
            .first()
        ).toBeVisible()
    })
})