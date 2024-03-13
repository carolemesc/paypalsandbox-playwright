import { faker } from "@faker-js/faker"
import dayjs from "dayjs"

/** @param {import('@playwright/test').Page} page */
const CreateAccount = async (page) => {
    async function createNewAccountFirstStep(
        email,
    ) {
        const emailFill = email || faker.internet.email({ provider: 'yopmail.com' })

        await page.getByRole('link', { name: 'Criar conta' }).click()
        await page.getByRole('button', { name: 'Avançar' }).click()
        await page.waitForURL('**/login_info')
        await page.getByRole('textbox', { name: 'E-mail' }).fill(emailFill)
        await page.keyboard.press('Enter')
    }

    async function createNewAccountSecondStep(
        phone,
    ) {
        const phoneFill = phone || '35' + faker.number.int({ min: '911111111', max: '999999999' })

        await page.waitForURL('**/login_info_phone')
        await page.locator('#paypalAccountData_phone').fill(phoneFill)
        await page.keyboard.press('Enter')
    }

    async function createNewAccountThirdStep(
        code,
    ) {
        const codeFill = code || '111111'

        await page.waitForURL('**/complete_phone_confirmation')
        await page.locator('.phoneConfirmation_input').first().pressSequentially(codeFill)
    }

    async function createNewAccount4thStep(
        password,
    ) {
        const passwordFill = password || '1@Aa' + faker.internet.password()

        await page.waitForURL('**/password')
        await page.getByRole('textbox', { name: 'Criar senha' }).fill(passwordFill)
        await page.getByRole('button', { name: 'Próximo' }).click()
    }

    async function createNewAccount5thStep(
        name,
        lastName,
        motherName,
        motherLastName,
    ) {
        const nameFill = name || faker.person.firstName()
        const lastNameFill = lastName || faker.person.lastName()
        const motherNameFill = motherName || faker.person.firstName()
        const motherLastNameFill = motherLastName || faker.person.lastName()

        await page.waitForURL('**/basic_info')
        await page.getByRole('textbox', { name: 'Nome', exact: true }).fill(nameFill)
        await page.getByRole('textbox', { name: 'Sobrenome', exact: true }).fill(lastNameFill)
        await page.getByRole('textbox', { name: 'Nome da mãe', exact: true }).fill(motherNameFill)
        await page.getByRole('textbox', { name: 'Sobrenome da mãe', exact: true }).fill(motherLastNameFill)
        await page.getByRole('button', { name: 'Continuar' }).click()

    }

    async function createNewAccount6thStep(
        cpf,
        birth,
    ) {
        const cpfFill = cpf || '79178601088'
        const birthFill = birth || dayjs().subtract(20, 'years').format('DD/MM/YYYY')


        await page.waitForURL('**/additional_info')
        await page.getByRole('textbox', { name: 'Número do CPF', exact: true }).fill(cpfFill)
        await page.getByRole('textbox', { name: 'Data de nascimento', exact: true }).fill(birthFill)
        await page.getByRole('combobox', { name: 'Profissão', exact: true }).click()
        await page.locator('.pp-cons-1cuk0h4-list_item').first().click()
        await page.getByRole('button', { name: 'Redimento mensal', exact: true }).click() //como o foco aqui não é encontrar bugs, mas sim seguir com o fluxo na automação, não importa o erro de digitação do placeholder
        await page.locator('.pp-cons-1cuk0h4-list_item').first().click()
        await page.getByRole('button', { name: 'Concordar e criar conta' }).click()
    }

    async function createNewAccount7thStep(
        address,
        neighborhood,
        city,
        cep,
    ) {
        const addressFill = address || 'Endereço Teste'
        const neighborhoodFill = neighborhood || 'Bairro Teste'
        const cityFill = city || 'Cidade Teste'
        const cepFill = cep || '64208-440'


        await page.waitForURL('**/address')
        await page.getByRole('textbox', { name: 'Endereço', exact: true }).fill(addressFill)
        await page.getByRole('textbox', { name: 'Distrito/Bairro', exact: true }).fill(neighborhoodFill)
        await page.getByRole('textbox', { name: 'Cidade', exact: true }).fill(cityFill)
        await page.getByRole('button', { name: 'Estado' }).click()
        await page.locator('.pp-cons-1cuk0h4-list_item').first().click()
        await page.getByRole('textbox', { name: 'CEP', exact: true }).fill(cepFill)
    }

    async function createNewAccount7thStepTermsAccepted() {
        await page.locator('.pp-cons-109pikv-checkmark_container').first().check()
        await page.getByRole('button', { name: 'Concordar e criar conta' }).click()
    }

    return {
        createNewAccountFirstStep,
        createNewAccountSecondStep,
        createNewAccountThirdStep,
        createNewAccount4thStep,
        createNewAccount5thStep,
        createNewAccount6thStep,
        createNewAccount7thStep,
        createNewAccount7thStepTermsAccepted,
    }
}

const createAccount = (page) => CreateAccount(page)
export default createAccount