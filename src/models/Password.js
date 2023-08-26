import uuid from "./uuid.js";
import { encrypt, decrypt } from "./hash/index.js";
class Password {
    constructor(password) {
        if (!password)
            throw new Error("Provide a Password String.");
        let key = uuid();
        let { text } = encrypt({ key, text: password });
        this.text = text;
        this.key = key;
        this.created = new Date().toISOString();
        this.current = true;
    }
    created_date() {
        return new Date(this.created);
    }
    get_password() {
        return decrypt(this);
    }
    is_match(pass) {
        let { text } = decrypt(this);
        return text === pass;
    }
    to_json() {
        let jso = JSON.parse(JSON.stringify(this));
        return jso;
    }
    to_string() {
        return JSON.stringify(this.to_json());
    }
    type_of() {
        return "password";
    }
    static import({ text, key, created, current, }) {
        let { text: pass } = decrypt({ key, text });
        const password = new Password(pass);
        password.current = current;
        password.created = created;
        return password;
    }
    static encrypt_password(password) {
        return encrypt(password);
    }
    static decrypt_password(password) {
        return decrypt(password);
    }
}
export default Password;
//# sourceMappingURL=Password.js.map