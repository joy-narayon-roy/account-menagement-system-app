import Account from "./Account.js";
class Web_Account extends Account {
    constructor({ web_url, uid = undefined, user_name, email_address, phone_number, password, author, }) {
        super({ user_name, email_address, password, author, type: "web" });
        this.update_phone_number(phone_number);
        this.web_url = web_url;
        this.uid = uid;
        if (email_address && author) {
            // console.log(author)
            const email = author.accounts.find_by_email_address(email_address);
            if (email) {
                this.update_email(email);
            }
        }
        if (phone_number && author) {
            const phone = author.phones.find_by_phone_number(phone_number);
            if (phone) {
                this.update_phone(phone);
            }
        }
    }
    update_web_url(web_url) {
        if (web_url) {
            this.web_url = web_url;
        }
        return this;
    }
    update_uid(uid) {
        if (uid) {
            this.uid = uid;
        }
        return this;
    }
}
export default Web_Account;
//# sourceMappingURL=Web_Account.js.map