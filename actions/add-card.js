import { test, expect } from "@playwright/test"
import data from "../fixtures/data"
import { faker } from "@faker-js/faker"
import dayjs from "dayjs"

/** @param {import('@playwright/test').Page} page */
const AddCard = async (page) => {
    async function addCartThroughAccountCreation() {
        await page.getByRole('button', { name: 'Adicionar um cartão' }).click()

        const alert = await page.getByRole('button', { name: 'Adicionar um cartão' }).isVisible()
        if (alert) {
            await page.getByRole('button', { name: 'Adicionar um cartão' }).click()
        }

        await page.waitForURL('**/cards/new/manual**')
    }

    async function insertCardData(
        cardNumber,
        dueDate,
        csv,
    ) {
        const cardNumberFill = cardNumber || faker.finance.creditCardNumber({ issuer: 'visa' })
        const dueDateFill = dueDate || dayjs().add(4, 'years').format('MM/YY')
        const csvFill = csv || faker.finance.creditCardCVV()

        await page.getByRole('textbox', { name: 'Número do cartão de débito ou crédito' }).fill(cardNumberFill)
        await page.locator('#brand').click()
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.locator('#expDate').fill(dueDateFill)
        await page.locator('#verificationCode').fill(csvFill)
        await page.getByRole('button', { name: 'Adicionar cartão' }).click()
        if (await page.getByRole('button', { name: 'Adicionar cartão' }).isVisible()) { //o foco aqui não é encontrar bugs, apenas seguir o fluxo da ferrament com a automação
            await page.getByRole('button', { name: 'Adicionar cartão' }).click()
        }
        await page.waitForURL('**/cards/new/manual/success**')
    }

    async function addCartThroughLogin() {
        await page.getByRole('link', { name:'Adicionar cartão ou banco' }).click()
        await page.waitForURL('**/accounts/new')
        await page.locator('.transfer-list-primaryText.test_cardPrimaryText:has-text("Adicione um cartão")').click()
        await page.waitForURL('**/cards/new/manual**')
    }

    

    async function removeCard() {
        const hasCard = await page.locator('.fi_list_item.cw-header__link cardFI__cardRowItem.css-ne5nyt-links_base-text_body_strong-secondary-text_body_strong').isVisible()
        if (hasCard) {
            await page.locator('.fi_list_item.cw-header__link cardFI__cardRowItem.css-ne5nyt-links_base-text_body_strong-secondary-text_body_strong').click()
            await page.waitForURL('**/money/cards/**')
            await page.getByRole('link', { name:'Remover cartão' }).click()
            await page.getByRole('button', { name:'Remover este cartão' }).click()
            await page.waitForURL('**/remove/success')
            await page.getByRole('link', { name:'Concluído' }).click()
            await page.waitForURL('**/myaccount/money/')
            await page.goto(`${data.APP.URL}/myaccount/summary`)
        }
        
    }

    return {
        addCartThroughAccountCreation,
        insertCardData,
        addCartThroughLogin,
        removeCard,
    }
}

const addCard = (page) => AddCard(page)
export default addCard