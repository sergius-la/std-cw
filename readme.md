## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Ballances

Public key HEX: 0312092bfaec20df01c01bf42650e362082b95ce31893526f02a447fce295d58d3
Signature HEX: bfc461f059cfb83a4eb86b7f82454e3d3f09478860421472addd98bcb4a1e8577267f382d2ead16a3b17e434aaa0a4644c6c719548b43d1c61005961ec06a2eb0


Public key HEX: 02a874842d7f3bea8d4446b16d25dfd56f3d53fb4ad9a9892a4a885d9d81753891
Signature HEX: 2993126fe37569294e5672d74f0aa7f8d59fc5dae8ab75b95d58c6830952e0925df410d72ff63dae89ea245d398cf98ec19edf1005ef53bcf83b78709c72ca151


Public key HEX: 03b711dd09a1bb594b87beb8cf572ad5b8115b3ea0aa338b8a43b23d1a7c76e1a4
Signature HEX: e3ce15b335b539bc25543483be5e097c8b64f38b836bd5f110b6c64c1f8f588f3df74d8e4c5bbf8a1dbbc869b01ce24c623a6d68d74bd73ba0bd97fd96b8a2181

Generation Script `node ./scripts/generate.js`