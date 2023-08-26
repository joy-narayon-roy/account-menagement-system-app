import Account from "./Account.js";
class App_Account extends Account {
    constructor({ uid, app_name, user_name, email_address = undefined, email = undefined, phone_number = undefined, phone = undefined, password, author, }) {
        super({ user_name, email_address, password, author, type: "app" });
        this.app_name = app_name;
        this.uid = uid;
        if (phone_number) {
            let phone_ins = author.phones.find_by_phone_number(phone_number);
            if (phone_ins) {
                this.update_phone(phone_ins);
            }
        }
        if (email_address) {
            const email_ins = author.accounts.find_by_email_address(email_address);
            if (email_ins) {
                this.update_email(email_ins);
            }
        }
        if (phone) {
            this.update_phone(phone);
        }
        if (email) {
            this.update_email(email);
        }
    }
    type_of() {
        return "app_account";
    }
    update_app_name(app_name) {
        this.app_name = app_name;
        return this;
    }
}
export default App_Account;
//# sourceMappingURL=App_Account.js.map