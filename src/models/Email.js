import Account from "./Account.js";
class Email extends Account {
    constructor({ user_name, email_address, password, author }) {
        super({ user_name, email_address, password, author, type: "email" });
        this.provider = undefined;
    }
}
export default Email;
//# sourceMappingURL=Email.js.map