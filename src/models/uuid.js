function uuid(prefix = "") {
    if (prefix) {
        prefix = prefix.toLowerCase().slice(0, 2);
        return (prefix +
            "_" +
            "xxxx_xxxx_4xxx_yxxx_xxxxxx".replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }));
    }
    else {
        return "xxxx_xxxx_4xxx_yxxx_xxxxxx".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
export default uuid;
//# sourceMappingURL=uuid.js.map