import { Page, Locator} from "@playwright/test";

const user_email = "binay.sah@keela.com";
const user_password = "Binay@keela321" ;

export default class loginPage{
    constructor (public page: Page){
        this.page = page
    }
   async loginUserCreditional(){
    await this.page.getByLabel('Email').fill(user_email);
    await this.page.getByLabel('Password').fill(user_password);
    await this.page.getByRole('button', { name: 'Log in' }).click(); 
   }
}