import { Page, Locator} from "@playwright/test";

// Import the dotenv module and load the .env variables
//creditional here ...!
const user_email = " ";
const user_password = " " ;

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