# Project Team-20
### **Team Members:** Neil Shah, Archana Yadawa, Nishtha Atrey, Kruti Thukral


## BlockChain for RealEsate title records  - APPROVED

### Problem statement: 

One of the biggest challenges in buying/selling real estate, especially in a country like India, is the legal process of checking the property's title. The percentage of frauds that happen in that domain are enormous(upwards of 50%) and expensive. A person would have to hire a lawyer and wait for 1-2 months until the legal check is done and even then there is no gurantee that the title is clear.  

Title records are decentralized, challenging-to-access aspect of the real estate buying/selling process. Even in 2017, title information remains stored at the local level and is offline. With the blockchain, this can be changed. The blockchain could provide a central title database for the entire country to securely store and instantly access historical title records, allowing for the streamlining of title transfer in a property sale. 


### Methodology: (Using HyperLedger Composer, MERN stack, kafka, AWS/bluemix)

- Property details need to be tracked, de-centralized and accessable to buyer/seller.
- Hyper Ledger Fabric will provide - Identity management, Privacy and confidentiality, Efficient processing, Chaincode functionalities, Modular design
- Create a front-end app/web portal where buyer/seller can search for properties and view all of its title details
- Back-end node server will handle requests for transactions and write to decentralized ledger

****************************************************************************************************************

****************************************************************************************************************

### Usage (currently runs locally, will be moved to cloud later)

#### Dependencies
- Docker
- Node (npm)
- nvm (version 8)
- Composer-rest-server (npm install -g composer-rest-server)
- Composer-cli (npm install -g composer-cli)
- Java 8
- Kafka 2.1.1-1.1.0


#### Starting Hyperledger
- Start Docker
- Inside hyperledger/fabric-dev-server/ run the following:
```sh
./downloadFabric.sh 
./startFabric.sh
./createPeerAdminCard.sh
```
- Go back one level to hyperledger/ and run the following:
```sh
composer network install --archiveFile digital-property.bna --card PeerAdmin@hlfv1

composer network start --networkName digital-property --networkVersion 0.2.6 --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw

composer card import --file admin@digital-property.card

composer-rest-server -c admin@digital-property -p 4000

```

#### Starting ZooKeeper and Kafka
- Inside kafka2.1.1-1.1.0/ folder:
Terminal 1:
```sh
bin/zookeeper-server-start.sh config/zookeeper.properties
```
Terminal 2:
```sh
bin/kafka-server-start.sh config/server.properties
```
Terminal 3: (need to run only each time device restarts)
```sh
./topic.sh 
```

#### Starting Frontend and Backend
- Inside Backend/
Terminal 4:
```sh
npm install
node index.js
```
- Inside kafka-backend/
Terminal 5:
```sh
npm install
npm start
```
- Inside Fronend/
Terminal 6:
```sh
npm install
npm start
```
