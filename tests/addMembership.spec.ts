import { test, expect } from '@playwright/test';
import loginPage from './../pages/loginPage';
import MembershipPage from '../pages/membershipTable';
import SubscriptionPage from '../pages/subscriptionPage';
import ContactPage from '../pages/contactPage';

const membershipData = {
    description:"this is description",
    amount: '50',
    duration :{
        monthly : 'Monthly',
        quarterly : 'Quarterly',
        annual : 'Annual',
        one_time : 'One-time',
        lifetime : 'Lifetime'
    }
}

test.beforeEach('loginPage', async ({ page }, testInfo) =>{
    testInfo.setTimeout(testInfo.timeout + 50000);
    const login = new loginPage(page);
    await page.goto('/');
    await login.loginUserCreditional(); 
    await expect(page).toHaveTitle(/Keela/);
})

test('Verify if user can create Monthly Membership',async({ page }) =>{
    const membership = new MembershipPage(page);
    const MonthlymembershipName = "Mothly Membership"  //chnage the name before running test as it uses 
    await membership.gotoMembershipSection();
    await membership.clickMemberShipFormButtom();
    await membership.fillMembershipPlanName(MonthlymembershipName);
    await membership.fillMembershipDescription(membershipData.description);
    await membership.selectDuration(membershipData.duration.monthly);
    await membership.fillFeeAmount(membershipData.amount);
    await membership.clickSaveMembershipForm();
    await expect(page.getByRole('link',{ name: MonthlymembershipName +' this is description'})).toBeVisible();
});
test('Verify if user can create One-Time Membership',async({ page }) =>{
    const membership = new MembershipPage(page);
    const OneTimemembershipName = "OneTime Membership";
    await membership.gotoMembershipSection();
    await membership.clickMemberShipFormButtom();
    await membership.fillMembershipPlanName(OneTimemembershipName);
    await membership.fillMembershipDescription(membershipData.description);
    await membership.selectDuration(membershipData.duration.one_time);
    await membership.fillFeeAmount(membershipData.amount);
    await membership.selectOneTimeStartDate('2');
    await membership.selectOneTimeEndDate('10');
    await membership.clickSaveMembershipForm();
    await expect(page.getByRole('link',{ name: OneTimemembershipName +' this is description'})).toBeVisible();
});

test('verify if user can add subscriber to membership',async({page})=>{
    const Subscription = new SubscriptionPage(page);
    const membership = new MembershipPage(page);
    const contact = new ContactPage(page);
    //Create One Membership
    const MonthlymembershipName = "Subsctription Add"
    await membership.gotoMembershipSection();
    await membership.clickMemberShipFormButtom();
    await membership.fillMembershipPlanName(MonthlymembershipName);
    await membership.fillMembershipDescription(membershipData.description);
    await membership.selectDuration(membershipData.duration.monthly);
    await membership.fillFeeAmount(membershipData.amount);
    await membership.clickSaveMembershipForm();
    await expect(page.getByRole('link',{ name: MonthlymembershipName +' this is description'})).toBeVisible();

    //Create New Contact 
    const contactName = "Binay" // assume a contact name Binay is already in the organization , alter the name if there's any
    const contactEmail = "binay@email.com" 
    await contact.CreateNewContact(contactName, contactEmail);

    //add subscription
    await membership.gotoMembershipSection();
    await Subscription.navigateToMembership(MonthlymembershipName);
    await Subscription.clickCreateSubcriptionButton();
    await Subscription.addContactToSubscription(contactName);
    await Subscription.selectStartDate('2');
    await Subscription.selectPaymentSection();
    await Subscription.saveSubscription();
    await Subscription.confirmSumbit();
    await expect(page.getByText('All Contacts '+ contactName + '- Memberships')).toBeVisible();
})

test('verify autoRenewOptionEnable', async({page}) =>{
    const membership = new MembershipPage(page);
    const Subscription = new SubscriptionPage(page);
    const membershipName = "random 7"  //chnage the name before running test
    await membership.gotoMembershipSection();
    await membership.clickMemberShipFormButtom();
    await membership.fillMembershipPlanName(membershipName);
    await membership.fillMembershipDescription(membershipData.description);
    await membership.selectDuration(membershipData.duration.monthly);
    await membership.fillFeeAmount(membershipData.amount);
    await membership.isMembershipRenewable();
    await membership.clickSaveMembershipForm();
    await expect(page.getByRole('link',{ name: membershipName +' this is description'})).toBeVisible();
    await Subscription.navigateToMembership("membershipName");
    await expect(page.getByRole('cell', { name: 'Renew Option Enabled' })).toBeVisible();
})

test('addingSubscriptionManually', async({page}) => {
    const contact = new ContactPage(page);
    const contactName = "Random";
    const contactEamil = "random@email.com";
    const plan = "Monthly New";
    await contact.CreateNewContactandSetPlan(contactName, contactEamil, plan);
})

test('Verify Membership with no subscroiber can be deleted', async({page})=>{
    const membership = new MembershipPage(page);
    const Subscription = new SubscriptionPage(page);
    const membershipName = "NO Subscriber"  //chnage the name before running test
    await membership.gotoMembershipSection();
    await membership.clickMemberShipFormButtom();
    await membership.fillMembershipPlanName(membershipName);
    await membership.fillMembershipDescription(membershipData.description);
    await membership.selectDuration(membershipData.duration.monthly);
    await membership.fillFeeAmount(membershipData.amount);
    await membership.clickSaveMembershipForm();
    await expect(page.getByRole('link',{ name: membershipName +' this is description'})).toBeVisible();
    await Subscription.navigateToMembership(membershipName);
    await page.getByRole('button', { name: '' }).click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.getByRole('link',{ name: membershipName +' this is description'})).not.toBeVisible();
})

test('Verify Membership with subscriber cannot be deleted', async({page}) =>{
    const membership = new MembershipPage(page);
    const Subscription = new SubscriptionPage(page);
    const membershipName = "With Subscriber"  //chnage the name before running test
    const contactName = "Binay";
    await membership.gotoMembershipSection();
    await membership.clickMemberShipFormButtom();
    await membership.fillMembershipPlanName(membershipName);
    await membership.fillMembershipDescription(membershipData.description);
    await membership.selectDuration(membershipData.duration.monthly);
    await membership.fillFeeAmount(membershipData.amount);
    await membership.clickSaveMembershipForm();
    await expect(page.getByRole('link',{ name: membershipName +' this is description'})).toBeVisible();

    await membership.gotoMembershipSection();
    await Subscription.navigateToMembership(membershipName);
    await Subscription.clickCreateSubcriptionButton();
    await Subscription.addContactToSubscription(contactName);
    await Subscription.selectStartDate('2');
    await Subscription.selectPaymentSection();
    await Subscription.saveSubscription();
    await Subscription.confirmSumbit();
    await expect(page.getByText('All Contacts '+ contactName + '- Memberships')).toBeVisible();

    await membership.gotoMembershipSection();
    await Subscription.navigateToMembership(membershipName);
    await page.getByRole('button', { name: '' }).click();
    await expect(page.getByText('Delete')).not.toBeVisible();

})