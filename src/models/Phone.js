import Account from "./Account.js";
class Phone extends Account {
    constructor({ user_name, phone_number, registered_name, author }) {
        super({
            user_name,
            author,
            email_address: undefined,
            password: undefined,
            type: "phone",
        });
        if (!this.validateBangladeshiPhoneNumber(phone_number)) {
            throw new Error(`${phone_number} is not valid`);
        }
        this.phone_number = phone_number;
        this.registered_name = registered_name;
    }
    update_registered_name(name) {
        if (!name)
            return this;
        this.registered_name = name;
        return this;
    }
    static validateBangladeshiPhoneNumber(phoneNumber) {
        const bangladeshiPhoneNumberRegex = /^(?:\+?880|0)(?:\d{10}|\d{8})$/;
        return bangladeshiPhoneNumberRegex.test(phoneNumber);
    }
    validateBangladeshiPhoneNumber(phoneNumber) {
        const bangladeshiPhoneNumberRegex = /^(?:\+?880|0)(?:\d{10}|\d{8})$/;
        return bangladeshiPhoneNumberRegex.test(phoneNumber);
    }
    type_of() {
        return "phone";
    }
}
export default Phone;
//# sourceMappingURL=Phone.js.map