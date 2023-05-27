const secp = require("ethereum-cryptography/secp256k1")
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils")
const { sha256 } = require("ethereum-cryptography/sha256")
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
// NOTE: Static message
const message = "Hello Crypto"

app.use(cors());
app.use(express.json());

const balances = {
  "0312092bfaec20df01c01bf42650e362082b95ce31893526f02a447fce295d58d3": 100,
  "02a874842d7f3bea8d4446b16d25dfd56f3d53fb4ad9a9892a4a885d9d81753891": 50,
  "03b711dd09a1bb594b87beb8cf572ad5b8115b3ea0aa338b8a43b23d1a7c76e1a4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;

  const balance = balances[address] || balances[getPublicKeyFromSignatureHex(address)] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, recipient, amount } = req.body;

  console.log(signature);

  const sender = getPublicKeyFromSignatureHex(signature)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function getPublicKeyFromSignatureHex(signatureHex) {
  const key = signatureHex.charAt(signatureHex.length - 1)
  const hex = signatureHex.slice(0, signatureHex.length - 1)
  const recSign = secp.secp256k1.Signature.fromCompact(hex)
  recSign.recovery = parseInt(key)

  return recSign.recoverPublicKey(toHex(getHash(message))).toHex()
}

function getHash(str) {
  return sha256(utf8ToBytes(str))
}