import { test, expect } from '@playwright/test'
import data from '../fixtures/data'
import login from '../actions/login'
import createAccount from '../actions/create-account'
import addCard from '../actions/add-card'

/** @type {import('@playwright/test').Page} */
let page

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(`${data.APP.URL}br/home`)
    await page.waitForURL(`${data.APP.URL}br/home`)
    const Cookie = await login(page)
    await Cookie.addCookie(page)
})

test.afterEach(async () => {
    await page.close()
})

test.describe('Adicionar cartão na conta', () => {
    test('Deve ser possível adicionar um cartão à uma conta já criada', async () => {
        const user = `${data.USER.EMAIL}`
        const password = `${data.USER.PASSWORD}`
        const Login = await login(page)
        await Login.loginWithUser(user, password)
        await page.waitForURL('**/myaccount/**')

        const AddCard = await addCard(page)
        await AddCard.addCartThroughLogin()
        await AddCard.insertCardData()


    })

    test('Deve ser possível adicionar um cartão à uma nova conta', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep()
        await Create.createNewAccountSecondStep()
        await Create.createNewAccountThirdStep()
        await Create.createNewAccount4thStep()
        await Create.createNewAccount5thStep()
        await Create.createNewAccount6thStep()
        await Create.createNewAccount7thStep()
        await Create.createNewAccount7thStepTermsAccepted()

        const AddCard = await addCard(page)
        await AddCard.addCartThroughAccountCreation()
        await AddCard.insertCardData()
    })
})