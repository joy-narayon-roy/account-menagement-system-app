async function encrypt({ key, text, }) {
    const res = await fetch("https://api-r7k3.onrender.com/hash/e", {
        headers: {
            key: key,
            text: text,
        },
    });
    const data = await res.json();
    return { status: res.status, ...data };
}
async function decrypt({ key, text, }) {
    const res = await fetch("https://api-r7k3.onrender.com/hash/d", {
        headers: {
            key: key,
            text: text,
        },
    });
    const data = await res.json();
    return { status: res.status, ...data };
}
export { encrypt, decrypt };
//# sourceMappingURL=hash_2.js.map