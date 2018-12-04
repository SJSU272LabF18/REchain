/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getParticipantRegistry getAssetRegistry getFactory */



/**
 * A transaction has been received on a property
 * @param {org.digitalproperty.TransactionDetails} transactionDetails - the Property Transaction
 * @transaction
 */
async function transactionDetails(transactionDetails) {  // eslint-disable-line no-unused-vars

    const property = transactionDetails.property;

    if (property.transactionHistory) {
        property.transactionHistory.push(transactionDetails);
    } else {
        property.transactionHistory = [transactionDetails];
    }

    // add the transaction to the specified property
    const propertyRegistry = await getAssetRegistry('org.digitalproperty.Property');
    await propertyRegistry.update(property);
}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.digitalproperty.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
async function setupDemo(setupDemo) {  // eslint-disable-line no-unused-vars

    const factory = getFactory();
    const NS = 'org.digitalproperty';

    // create the shipment
    const property = factory.newResource(NS, 'Property', 'PROP_1');

    // add the shipments
    const propertyRegistry = await getAssetRegistry(NS + '.Property');
    await propertyRegistry.addAll([property]);
}