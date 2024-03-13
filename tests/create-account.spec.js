import { test, expect } from '@playwright/test'
import data from '../fixtures/data'
import login from '../actions/login'
import createAccount from '../actions/create-account'

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

test.describe('Criação de conta válida', () => {
    test('Deve ser possível criar uma conta gratuitamente', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep()
        await Create.createNewAccountSecondStep()
        await Create.createNewAccountThirdStep()
        await Create.createNewAccount4thStep()
        await Create.createNewAccount5thStep()
        await Create.createNewAccount6thStep()
        await Create.createNewAccount7thStep()
        await Create.createNewAccount7thStepTermsAccepted()

        await page.waitForURL('**/intent_selection')
        await expect(page.getByText('Bem-vindo ao PayPal!')).toBeVisible()
    })
})

test.describe('Criação de conta inválida', () => {
    test('Não deve ser possível criar uma conta com endereço de email inválido', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep('emailinvalido.com')

        await expect(page.getByText('Informe um endereço de e-mail válido.')).toBeVisible()
    })

    test('Não deve ser possível criar uma conta com número de telefone inválido', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep()
        await Create.createNewAccountSecondStep('123')

        await expect(page.getByText('Verifique seu número de telefone.')).toBeVisible()
    })

    test('Não deve ser possível criar uma conta com código de confirmação incorreto', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep()
        await Create.createNewAccountSecondStep()
        await Create.createNewAccountThirdStep('888888')

        await expect(page.getByText('Confirme o código e tente novamente.')).toBeVisible()
    })

    test('Não deve ser possível criar uma conta com senha inválida', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep()
        await Create.createNewAccountSecondStep()
        await Create.createNewAccountThirdStep()
        await Create.createNewAccount4thStep('aa')

        await expect(page.getByText('Use pelo menos um número ou símbolo (como !@#%^).')).toBeVisible()
    })

    test('Não deve ser possível criar uma conta sem nomes', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep()
        await Create.createNewAccountSecondStep()
        await Create.createNewAccountThirdStep()
        await Create.createNewAccount4thStep()
        await Create.createNewAccount5thStep(' ', ' ', ' ', ' ')

        await expect(page.getByText('O campo nome é obrigatório.')).toBeVisible()
        await expect(page.getByText('O campo sobrenome é obrigatório.')).toBeVisible()
        await expect(page.getByText('Informe o nome da mãe.')).toBeVisible()
        await expect(page.getByText('Informe o sobrenome da mãe.')).toBeVisible()
    })

    test('Não deve ser possível criar uma conta sem informações adicionais', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep()
        await Create.createNewAccountSecondStep()
        await Create.createNewAccountThirdStep()
        await Create.createNewAccount4thStep()
        await Create.createNewAccount5thStep()
        await Create.createNewAccount6thStep(' ', ' ')

        await expect(page.getByText('Esta informação é obrigatória')).toBeVisible()
        await expect(page.getByText('Informe uma data válida. Use o formato: dd/mm/aaaa')).toBeVisible()
    })

    test('Não deve ser possível criar uma conta sem informações de endereço', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep()
        await Create.createNewAccountSecondStep()
        await Create.createNewAccountThirdStep()
        await Create.createNewAccount4thStep()
        await Create.createNewAccount5thStep()
        await Create.createNewAccount6thStep()
        await Create.createNewAccount7thStep(' ', ' ', ' ', '')

        await expect(page.getByText('O campo endereço de correspondência é obrigatório.')).toBeVisible()
        await expect(page.getByText('O campo cidade é obrigatório.')).toBeVisible()
    })

    test('Não deve ser possível criar uma conta sem aceitar os termos', async () => {
        const Create = await createAccount(page)
        await Create.createNewAccountFirstStep()
        await Create.createNewAccountSecondStep()
        await Create.createNewAccountThirdStep()
        await Create.createNewAccount4thStep()
        await Create.createNewAccount5thStep()
        await Create.createNewAccount6thStep()
        await Create.createNewAccount7thStep()

        await page.getByRole('button', { name: 'Concordar e criar conta' }).click()
        await expect(page.getByText('Clique na caixa para concordar.')).toBeVisible()
    })
})
