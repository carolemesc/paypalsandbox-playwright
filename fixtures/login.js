import data from "./data"

/** @param {import('@playwright/test').Page} page */
const Login = async (page) => {
    async function loginWithValidUser(user, password) {
        console.log('usuario funcao: ', user);
        console.log('senha funcao: ', user);
        await page.goto(data.APP.URL)
        await page.getByRole('link', { name: 'Entrar' }).click()
        await page.locator('#email').fill(user)
        await page.getByRole('button', { name: 'Avançar' }).click()
        await page.locator('#password').fill(password)
        await page.getByRole('button', { name: 'Log in' }).click()
        await page.waitForURL('**/myaccount/**')
    }

    return {
        loginWithValidUser,
    }
}

const login = (page) => Login(page)
export default login