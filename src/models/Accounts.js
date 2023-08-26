/* eslint-disable no-case-declarations */
import Account from "./Account.js";
import App_Account from "./App_Account.js";
import Email from "./Email.js";
import Facebook from "./Facebook.js";
import Web_Account from "./Web_Account.js";
export default class Accounts {
  constructor() {
    this.all = {};
  }
  get length() {
    return Object.keys(this.all).length;
  }
  find_by_email_address(email_address) {
    for (let account of Object.values(this.all)) {
      if (account instanceof Email && account.email_address == email_address) {
        return account;
      }
    }
    return null;
  }
  find_by_id(id) {
    return this.all[id];
  }
  sort_by_type() {
    let sorted_obj = {};
    let types = ["email", "facebook", "web", "app"];
    for (const type of types) {
      if (!sorted_obj[type]) {
        sorted_obj[type] = new Accounts();
      }
      let all_value = Object.values(this.all);
      for (const value of all_value) {
        if (value && value.type === type) {
          sorted_obj[type].add(value);
        }
      }
    }
    return sorted_obj;
  }
  add(...accounts) {
    let account;
    for (account of accounts) {
      if (account instanceof Account) {
        let id = account.id;
        let data = this.all;
        this.all = {
          ...data,
          [id]: account,
        };
      }
    }
    return this;
  }
  delete(id) {
    delete this.all[id];
    return this;
  }
  to_json() {
    let obj = {};
    let entries = Object.entries(this.all);
    for (const entrie of entries) {
      let [key, account] = entrie;
      if (account) {
        obj[key] = account.to_json();
      }
    }
    return obj;
  }
  import(datas, author) {
    for (const id in datas) {
      const data = datas[id];
      if (data) {
        const type_of_acc = data.type;
        switch (type_of_acc) {
          case "email":
            let email_account = new Email(data);
            Object.assign(email_account, data);
            email_account.set_author(author);
            this.add(email_account);
            break;
          case "facebook":
            let fb = new Facebook(data);
            Object.assign(fb, data);
            fb.set_author(author);
            this.add(fb);
            break;
          case "web":
            if (data.email) {
              data.email = this.find_by_id(data.email);
            }
            if (data.phone) {
              data.phone = author?.phones.find_by_id(data.phone);
            }
            let web = new Web_Account(data);
            Object.assign(web, data);
            this.add(web);
            break;
          case "app":
            if (data.email) {
              data.email = this.find_by_id(data.email);
            }
            if (data.phone) {
              data.phone = author?.phones.find_by_id(data.phone);
            }
            let app = new App_Account(data);
            Object.assign(app, data);
            this.add(app);
            break;
          default:
            break;
        }
      }
    }
  }
}
//# sourceMappingURL=Accounts.js.map
