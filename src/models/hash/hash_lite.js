function encrypt({ key, text }) {
    const keyLength = key.length;
    const encryptedChars = [];
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % keyLength);
        const encryptedCharCode = (charCode + keyCharCode) % 256;
        encryptedChars.push(encryptedCharCode);
    }
    return {
        key,
        text: encryptedChars
            .map((charCode) => String.fromCharCode(charCode))
            .join(""),
    };
}
function decrypt({ key, text }) {
    const keyLength = key.length;
    const decryptedChars = [];
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % keyLength);
        const decryptedCharCode = (charCode - keyCharCode + 256) % 256;
        decryptedChars.push(decryptedCharCode);
    }
    return {
        text: decryptedChars
            .map((charCode) => String.fromCharCode(charCode))
            .join(""),
        key,
    };
}
// const key = "encryptionkey";
// const originalText = "Hello, this is a secret message.";
// // Encrypt the original text
// const encryptedText = encrypt(key, originalText);
// console.log("Encrypted:", encryptedText);
// // Decrypt the encrypted text
// const decryptedText = decrypt(key, encryptedText);
// console.log("Decrypted:", decryptedText);
export { encrypt, decrypt };
//# sourceMappingURL=hash_lite.js.map