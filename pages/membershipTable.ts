import { Page } from "@playwright/test";

export default class MembershipPage{
    constructor (public page: Page){
        this.page = page
    }
    async gotoMembershipSection(){
        await this.page.getByRole('link', { name: ' Memberships' }).click();
    }

    async clickMemberShipFormButtom(){
        await this.page.getByRole('button', { name: 'New Membership Plan' }).click();
    }

    async fillMembershipPlanName(membershipName:string){
        await this.page.getByTestId('input-name').fill(membershipName);
    }
    async fillMembershipDescription(description:string){
        await this.page.getByTestId('input-description').fill(description);
    }
    async selectDuration(duration:string){
        await this.page.getByRole('button', { name: duration }).click();
    }

    async fillFeeAmount(amount:string){
        await this.page.getByTestId('input-amount').fill(amount); 
    }
    async isMembershipStartedInPast(){
        await this.page.getByText('Membership started in the past').click();
    }
    async isMembershipRenewable(){
        await this.page.getByText('Enable option to renew').click(); 
    }
    async isJoinDate(){
        await this.page.getByText('Join Date').click();
    }
    async selectOneTimeStartDate(date:string){
        await this.page.getByLabel('Datepicker input').first().click();
        await this.page.getByText(date, { exact: true }).first().click();
        await this.page.getByRole('button', { name: 'Select' }).click();
    }
    async selectOneTimeEndDate(date:string){
        await this.page.getByLabel('Datepicker input').nth(1).click();
        await this.page.getByText(date, { exact: true }).click();
        await this.page.getByRole('button', { name: 'Select' }).click()
    }
    async clickSaveMembershipForm(){
        await this.page.getByTestId('modal-save').click();
    }
}