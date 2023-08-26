import Phone from "./Phone.js";
export default class Phones {
  constructor() {
    this.all = {};
  }
  get length() {
    return Object.keys(this.all).length;
  }
  add(...phones) {
    phones.forEach((phone) => {
      const id = phone.phone_number;
      if (id) {
        this.all[id] = phone;
      }
    });
    return this;
  }
  find_by_phone_number(number) {
    return this.all[number];
  }
  find_by_id(id) {
    if (this.all) {
      for (const key in this.all) {
        if (this.all[key].id == id) {
          return this.all[key];
        }
      }
    } else {
      return null;
    }
  }
  delete(phone_number) {
    delete this.all[phone_number];
    return this;
  }
  delete_by_id(id) {
    if (this.all) {
      for (const key in this.all) {
        if (this.all[key].id == id) {
          delete this.all[key];
          break;
        }
      }
    }
    return this;
  }
  to_json() {
    let data = JSON.parse(JSON.stringify(this.all));
    // console.log(th)
    for (const key in data) {
      data[key].id = this.all[key].id;
    }
    return data;
  }
  import(datas) {
    let entries = Object.entries(datas);
    for (const data of entries) {
      let id;
      let value;
      [id, value] = data;
      let phone = new Phone(value);
      Object.assign(phone, value);
      this.all[id] = phone;
    }
  }
}
//# sourceMappingURL=Phones.js.map
