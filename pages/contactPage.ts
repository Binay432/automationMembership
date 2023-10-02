import { Page, expect} from "@playwright/test";

export default class ContactPage{
    constructor (public page: Page){
        this.page = page
    }
    async CreateNewContactandSetPlan(contactName:string, email:string, plan:string){
        await this.page.getByRole('link', { name: ' Contacts' }).click(); 
        await this.page.getByRole('button', { name: 'Add Contact' }).click();
        await this.page.getByTestId('input-firstName').fill(contactName);
        await this.page.getByTestId('input-primaryEmail').fill(email);
        await this.page.getByTestId('modal-save').click();
        await this.page.getByRole('link', { name: 'Memberships', exact: true }).click();
        await this.page.getByRole('button', { name: 'Create Subscription' }).click();
        await this.page.getByPlaceholder('Start typing to search...').click();
        await this.page.getByRole('option', { name: plan }).click();
        await this.page.getByRole('link', { name: 'Payment' }).click();
        await this.page.getByTestId('modal-save').click();
        await this.page.getByRole('button', { name: 'Confirm' }).click(); 
    }
    async CreateNewContact(contactName:string, email:string){
        await this.page.getByRole('link', { name: ' Contacts' }).click(); 
        await this.page.getByRole('button', { name: 'Add Contact' }).click();
        await this.page.getByTestId('input-firstName').fill(contactName);
        await this.page.getByTestId('input-primaryEmail').fill(email);
        await this.page.getByTestId('modal-save').click();
    }
    
}