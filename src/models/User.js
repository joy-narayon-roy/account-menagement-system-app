import { db } from "../firebase.js";
import Accounts from "./Accounts.js";
import Phones from "./Phones.js";
import Password from "./Password.js";
import Phone from "./Phone.js";
import { get, ref, set } from "firebase/database";
const _id = Symbol("id");
const _accounts = Symbol("accounts");
const _phones = Symbol("phones");
const _password = Symbol("password");
class User {
    constructor({ uid, name, email, password }) {
        this[_id] = uid;
        this[_accounts] = new Accounts();
        this[_phones] = new Phones();
        this.name = name;
        this.email = email;
        this.phone_number = null;
        this[_password] = new Password(password);
    }
    get id() {
        return this[_id];
    }
    set id(value) {
        this[_id] = value;
    }
    get accounts() {
        return this[_accounts];
    }
    set accounts(accounts) {
        this.accounts.import(accounts, this);
    }
    get password() {
        return this[_password];
    }
    set password(value) {
        this[_password] = new Password(value);
    }
    get phones() {
        return this[_phones];
    }
    set phones(phones) {
        this.phones.import(phones);
    }
    get_accounts() {
        return JSON.parse(JSON.stringify(this[_accounts]));
    }
    get_phones() {
        return JSON.parse(JSON.stringify(this[_phones]));
    }
    updata_name(name) {
        this.name = name;
        return this;
    }
    updata_email(email) {
        this.name = email;
        return this;
    }
    updata_phone_number(phone_number) {
        if (!Phone.validateBangladeshiPhoneNumber(phone_number)) {
            throw new Error(`${phone_number} is not valid`);
        }
        this.phone_number = phone_number;
        return this;
    }
    updata_password(password) {
        this.password = new Password(password);
        return this;
    }
    to_json() {
        let data = JSON.parse(JSON.stringify(this));
        data.id = this.id;
        data.phones = this[_phones].to_json();
        data.accounts = this[_accounts].to_json();
        data.password = this.password.to_json();
        return data;
    }
    async save() {
        const userData = this.to_json();
        return await set(ref(db, `user/${this.id}`), userData);
    }
    type_of() {
        return "user";
    }
    static import(data) {
        data.password = Password.decrypt_password(data.password).text;
        let user = new User(data);
        Object.assign(user, data);
        return user;
    }
    static async import_db(uid) {
        const data_snap = (await get(ref(db, `user/${uid}`))).toJSON();
        if (data_snap) {
            return this.import(data_snap);
        }
        else {
            return null;
        }
    }
}
export default User;
//# sourceMappingURL=User.js.map