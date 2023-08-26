import Account from "./Account.js";
class Facebook extends Account {
    constructor({ user_name, password, profile_url = "", email_address = undefined, phone_number = undefined, email = undefined, phone = undefined, author, }) {
        super({ user_name, email_address, password, author, type: "facebook" });
        this.profile_url = profile_url;
        if (phone_number) {
            this.phone_number = phone_number;
        }
        if (email) {
            this.update_email(email);
        }
        if (phone) {
            this.update_phone(phone);
        }
    }
    update_profile_url(profile_url) {
        this.profile_url = profile_url;
        return this;
    }
}
export default Facebook;
//# sourceMappingURL=Facebook.js.map