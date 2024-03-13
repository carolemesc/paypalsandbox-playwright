import { expect } from "@playwright/test"

/** @param {import('@playwright/test').Page} page */
const Login = async (page) => {
    async function addCookie() {
        await page.waitForTimeout(2000)
        await page.locator('#acceptAllButton').click()
        await expect(page.locator('#acceptAllButton')).toBeHidden()
        await page.waitForTimeout(2000)
    }

    async function loginWithUser(user, password) {
        await page.getByRole('link', { name: 'Entrar' }).click()
        await page.locator('#email').fill(user)
        await page.getByRole('button', { name: 'Avançar' }).click()
        await page.locator('#password').fill(password)
        await page.getByRole('button', { name: 'Log in' }).click()
    }

    return {
        loginWithUser,
        addCookie,
    }
}

const login = (page) => Login(page)
export default login