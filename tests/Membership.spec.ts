import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage';
import MembershipPage from '../pages/membershipTable';
import SubscriptionPage from '../pages/subscriptionPage';
import ContactPage from '../pages/contactPage';

test.beforeEach('loginPage', async ({ page }, testInfo) =>{
    testInfo.setTimeout(testInfo.timeout + 50000);
    const login = new loginPage(page);
    await page.goto('/');
    await login.loginUserCreditional(); 
    await expect(page).toHaveTitle(/Keela/);
})
test('Verify if user can create Monthly Membership',async({ page }) =>{
    const membership = new MembershipPage(page);
    const MembershipDetails = {
        name:"Membership 1",
        description:"this is description",
        duration:"Monthly",
        amount:"50",
        isMembershipRenew:false,
    } 
    await membership.addMembership(MembershipDetails.name, MembershipDetails.description, MembershipDetails.duration, MembershipDetails.amount, MembershipDetails.isMembershipRenew);
    await expect(page.getByRole('link',{ name: MembershipDetails.name +' this is description'})).toBeVisible();
});
test('Verify if user can create One-Time Membership',async({ page }) =>{
    const membership = new MembershipPage(page);
    const MembershipDetails = {
        name:"Membership 2",
        description:"this is description",
        duration:"One-time",
        amount:"50",
        isMembershipRenew:false,
    } 
    await membership.addMembership(MembershipDetails.name, MembershipDetails.description, MembershipDetails.duration, MembershipDetails.amount, MembershipDetails.isMembershipRenew);
    await expect(page.getByRole('link',{ name: MembershipDetails.name +' this is description'})).toBeVisible();
});

test('verify autoRenewOptionEnable', async({page}) =>{
    const membership = new MembershipPage(page);
    const Subscription = new SubscriptionPage(page);
    const MembershipDetails = {
        name:"Membership 3",
        description:"this is description",
        duration:"Monthly",
        amount:"50",
        isMembershipRenew:true,
    } 
    await membership.addMembership(MembershipDetails.name, MembershipDetails.description, MembershipDetails.duration, MembershipDetails.amount, MembershipDetails.isMembershipRenew);
    await expect(page.getByRole('link',{ name: MembershipDetails.name +' this is description'})).toBeVisible();
    await Subscription.navigateToMembership(MembershipDetails.name, MembershipDetails.description);
    console.log(MembershipDetails.name);
    await expect(page.getByRole('cell', { name: 'Renew Option Enabled' })).toBeVisible();
})

test ('verify if user can add subscriber to mermbership',async({page})=>{
    const Subscription = new SubscriptionPage(page);
    const membership = new MembershipPage(page);
    const contact = new ContactPage(page);
    const MembershipDetails = {
        name:"Membership 4",
        description:"this is description",
        duration:"Monthly",
        amount:"50",
        isMembershipRenew:true,
    } 
    await membership.addMembership(MembershipDetails.name, MembershipDetails.description, MembershipDetails.duration, MembershipDetails.amount, MembershipDetails.isMembershipRenew);
    await expect(page.getByRole('link',{ name: MembershipDetails.name +' this is description'})).toBeVisible();
    const contactDetails={
        name:"test contact 1",
        email:"test@email.com"
    }
    await contact.CreateNewContact(contactDetails.name, contactDetails.email);
    await membership.gotoMembershipSection();
    await Subscription.createSubscription(MembershipDetails.name, MembershipDetails.description,contactDetails.name);
})
test('Verify if user can subscribe manually', async({page})=>{
    const contact = new ContactPage(page);
    const membership = new MembershipPage(page);
    const MembershipDetails = {
        name:"Membership 5",
        description:"this is description",
        duration:"Monthly",
        amount:"50",
        isMembershipRenew:false,
    }
    await membership.addMembership(MembershipDetails.name, MembershipDetails.description, MembershipDetails.duration, MembershipDetails.amount, MembershipDetails.isMembershipRenew);
    const contactDetails={
        name:"test contact 2",
        email:"test10@email.com"
    }
    await contact.CreateNewContactandSetPlan(contactDetails.name, contactDetails.email, MembershipDetails.name);
})

test('Verify Membership with no subscriber can be deleted', async({page})=>{
    const membership = new MembershipPage(page);
    const Subscription = new SubscriptionPage(page);
    const MembershipDetails = {
        name:"Membership 6",
        description:"this is description",
        duration:"Monthly",
        amount:"50",
        isMembershipRenew:false,
    }
    await membership.addMembership(MembershipDetails.name, MembershipDetails.description, MembershipDetails.duration, MembershipDetails.amount, MembershipDetails.isMembershipRenew);
    await expect(page.getByRole('link',{ name: MembershipDetails.name +' this is description'})).toBeVisible();
    await Subscription.navigateToMembership(MembershipDetails.name, MembershipDetails.description);
    await page.getByRole('button', { name: '' }).click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.getByRole('link',{ name: MembershipDetails.name +' this is description'})).not.toBeVisible();
})

test('Verify Membership with subscriber cannot be deleted', async({page})=>{
    const membership = new MembershipPage(page);
    const Subscription = new SubscriptionPage(page);
    const contact = new ContactPage(page);
    const contactDetails={
        name:"test contact 3",
        email:"test10@email.com"
    }
    await contact.CreateNewContact(contactDetails.name, contactDetails.email);
    const MembershipDetails = {
        name:"Membership 7",
        description:"this is description",
        duration:"Monthly",
        amount:"50",
        isMembershipRenew:false,
    }
    await membership.addMembership(MembershipDetails.name, MembershipDetails.description, MembershipDetails.duration, MembershipDetails.amount, MembershipDetails.isMembershipRenew);
    await expect(page.getByRole('link',{ name: MembershipDetails.name +' this is description'})).toBeVisible();
    await Subscription.navigateToMembership(MembershipDetails.name, MembershipDetails.description);
    await page.getByRole('button', { name: '' }).click();
    await expect(page.getByText('Delete')).not.toBeVisible();
})
