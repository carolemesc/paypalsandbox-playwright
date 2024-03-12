import { test, expect } from '@playwright/test'
import data from '../fixtures/data'
import Login from '../fixtures/login'
import login from '../fixtures/login'

/** @type {import('@playwright/test').Page} */
let page

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
})

test.describe('nome', () => {
    test.only('Deve ser possível logar com um usuário existente', async () => {
        const user = `${data.USER.EMAIL}`
        const password = `${data.USER.PASSWORD}`
        console.log('usuario teste: ', user);
        console.log('senha teste: ', password);
        const Login = await login(page)
        await Login.loginWithValidUser(user, password)
    })
})