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
- Inside hyperledger/fabric-dev-server run the following:
```sh
> ./downloadFabric.sh 
./startFabric.sh
./createPeerAdminCard.sh>
```
