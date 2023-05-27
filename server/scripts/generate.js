const secp = require("ethereum-cryptography/secp256k1")
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils")
const { sha256 } = require("ethereum-cryptography/sha256")

function getHash(str) {
    return sha256(utf8ToBytes(str))
}

function getMessageSignature(msgHash, privateKey) {
    return secp.secp256k1.sign(toHex(msgHash), privateKey, {recovery: true})
}

function getSignatureWithRecoveryKey(signature) {
    const key = signature.recovery
    return signature.toCompactHex() + key
}

function getPublicKeyFromSignatureHex(signatureHex) {
    const key = signatureHex.charAt(signatureHex.length - 1)
    const hex = signatureHex.slice(0, signatureHex.length - 1)
    const recSign = secp.secp256k1.Signature.fromCompact(hex)
    recSign.recovery = parseInt(key)

    return recSign.recoverPublicKey(toHex(getHash(message))).toHex()
}

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const hexPrivateKey = toHex(privateKey)

// NOTE: Static message
const message = "Hello Crypto"
const publicKey = secp.secp256k1.getPublicKey(privateKey) 
const hexPublickKey = toHex(publicKey)

const signature = getMessageSignature(getHash(message), privateKey)
const hexSignature = getSignatureWithRecoveryKey(signature)

const hexRecoveredPublicKeyHex = getPublicKeyFromSignatureHex(hexSignature)

console.log('Private key HEX:', hexPrivateKey);
console.log('Public key HEX:', hexPublickKey);

console.log('Signature HEX:', hexSignature);

console.log('REC Public key HEX:', hexRecoveredPublicKeyHex);
console.log("Is public keyes match", hexPublickKey === hexRecoveredPublicKeyHex);
















// const rec = secp.secp256k1.Signature.fromCompact(signature.toCompactHex())
// // rec.recovery = signature.recovery
// console.log(rec);

// console.log(hexPublickKey);
// console.log(rec.recoverPublicKey(toHex(getHash(message))).toHex());

// console.log(hexPublickKey === rec.recoverPublicKey(toHex(getHash(message))).toHex());


