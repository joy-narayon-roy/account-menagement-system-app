import Password from "./Password.js";
import generateUUID from "./uuid.js";
const _id = Symbol("id");
const _author = Symbol("author");
const _password = Symbol("password");
class Account {
    constructor({ user_name, email_address = undefined, password, author, type = "account", }) {
        this[_id] = generateUUID();
        this[_author] = author;
        this.user_name = user_name;
        this.email = undefined;
        this.phone = undefined;
        this.email_address = email_address;
        this.phone_number = undefined;
        this[_password] =
            password instanceof Password
                ? password
                : typeof password == "string"
                    ? new Password(password)
                    : undefined;
        this.active = true;
        this.type = type;
    }
    get id() {
        return this[_id];
    }
    set id(value) {
        this[_id] = value;
    }
    get password() {
        return this[_password];
    }
    set password(value) {
        this[_password] = Password.import(value);
    }
    get author() {
        return this[_author];
    }
    set_author(author) {
        if (author) {
            this[_author] = author;
        }
        return this;
    }
    update_user_name(name) {
        if (!name)
            return this;
        this.user_name = name;
        return this;
    }
    update_email(email) {
        if (!email)
            return this;
        this.email = email;
        this.email_address = undefined;
        return this;
    }
    update_email_address(address) {
        if (!address) {
            return this;
        }
        this.email_address = address;
        this.email = undefined;
        return this;
    }
    update_phone(phone) {
        if (!phone) {
            return this;
        }
        this.phone = phone;
        this.phone_number = undefined;
        return this;
    }
    update_phone_number(phone_number) {
        if (!phone_number) {
            return this;
        }
        else if (phone_number.length == 11) {
            this.phone_number = phone_number;
            this.phone = undefined
            return this;
        }
        return this;
    }
    update_password(password) {
        if (!password) {
            return this;
        }
        this[_password] = new Password(password);
        return this;
    }
    update_active(state) {
        this.active = state || !this.active;
        return this;
    }
    to_string() {
        return JSON.stringify(this);
    }
    to_json() {
        let json_data = JSON.parse(JSON.stringify(this));
        json_data.id = this.id;
        if (this[_password] instanceof Password) {
            json_data.password = this[_password].to_json();
        }
        Object.entries(this).forEach(([key, value]) => {
            if (value instanceof Account) {
                if (key == "email") {
                    json_data[key] = value.id;
                }
                else if (key == "phone") {
                    json_data[key] = value.id;
                }
                else {
                    json_data[key] = value.to_json();
                }
            }
        });
        return json_data;
    }
}
export default Account;
//# sourceMappingURL=Account.js.map