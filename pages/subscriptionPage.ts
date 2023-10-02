import { Page } from "@playwright/test";

export default class SubscriptionPage{
    constructor (public page: Page){
        this.page = page
    }
    async createSubscription(membershipName:string, membershipDescription:string,contactName:string){
        await this.page.getByRole('link', { name: membershipName + " "+membershipDescription }).click();
        await this.page.getByRole('button', { name: 'Create Subscription' }).click();
        await this.page.getByPlaceholder('Start typing to search...').fill(contactName);
        await this.page.getByRole('option', { name: contactName }).click();
        await this.page.getByRole('link', { name: 'Payment' }).click();
        await this.page.getByTestId('modal-save').click();
        await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
    async navigateToMembership(membershipName:string, membershipDescription:string){
        await this.page.getByRole('link', { name: membershipName + " "+membershipDescription }).click();
    }
    async clickCreateSubcriptionButton(){
        await this.page.getByRole('button', { name: 'Create Subscription' }).click();
    }
    async addContactToSubscription(contactName:string){
        await this.page.getByPlaceholder('Start typing to search...').fill(contactName);
        await this.page.getByRole('option', { name: contactName }).click();
    }
    async selectStartDate(date:string){
        await this.page.getByLabel('Datepicker input').click();
        await this.page.getByText(date, { exact: true }).first().click();
        await this.page.getByRole('button', { name: 'Select' }).click();
    }
    async selectPaymentSection(){
        await this.page.getByRole('link', { name: 'Payment' }).click();
    }
    async saveSubscription(){
        await this.page.getByTestId('modal-save').click();
    //  await page.getByRole('heading', { name: 'Are you sure?' }).click();
    }
    async confirmSumbit(){
        await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
    
}