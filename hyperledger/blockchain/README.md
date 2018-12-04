# Digital Property Network
Go to blockchain folder and run below commands
* nvm use 8
* npm install 
* Create BNA file if not created 
> Example 
cd blockchain
> nvm use 8
> npm install
> composer archive create  --sourceType dir --sourceName . -a ./dist/digital-property.bna
 

> Example business network that digital properties and transactions on the property

The business network keeps a track of the property transactions

This business network defines:

**Participants**
`None`

**Assets**
`Property`

**Transactions**
`TransactionDetails` `SetupDemo`

To test this Business Network Definition in the **Test** tab:

Submit a `SetupDemo` transaction:

```
{
  "$class": "org.digitalproperty.SetupDemo"
}
```

This transaction adds property transaction details to the property

Submit a `TransactionDetails` transaction:

```
{
  "$class": "org.digitalproperty.TransactionDetails",
  "buyer": "Harry Potter",
  "seller": "Ron Weasley",
  "trans_date": "12-01-01",
  "trans_amt": "6000000",
  "property": "PROP_1"
}
```

Congratulations!

## License <a name="license"></a>
Hyperledger Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file. Hyperledger Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.
