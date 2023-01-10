const xrpl = require("xrpl");
const config = require('config');
const xrplServer = config.get('XRPL_Server');
const xrp_account = config.get('Account');
const xrp_account_secret = config.get('Secret_Key');

function CancelOffers(offers) {
    return {
        TransactionType: "NFTokenCancelOffer",
        Account: xrp_account,
        NFTokenOffers: offers
      };  
  }

  function AccountObjectsPayload(marker){
    if(marker == undefined)
    {
        return {
            "command": "account_objects",
            "account": xrp_account,
            "ledger_index": "validated",
            "limit": 200
          }
    } else {
        return {
            "command": "account_objects",
            "account": xrp_account,
            "ledger_index": "validated",
            "limit": 200,
            "marker": marker
          }
    }
  }

async function main() {
     const client = new xrpl.Client(xrplServer);
     await client.connect();

     let offerObjects = [];

     try{
     let marker = undefined;
     console.log('Getting offers');
     do {
        let accountObjects = await client.request(AccountObjectsPayload(marker));
        for(let i = 0; i < accountObjects.result.account_objects.length; i++)
        {
            if(accountObjects.result.account_objects[i].LedgerEntryType == "NFTokenOffer")
            {
                offerObjects.push(accountObjects.result.account_objects[i]);
            }
        }
        marker = accountObjects.marker;
      } while (marker != undefined);
    } catch(err) { console.log('Error getting offers: ' + err);}

    console.log(offerObjects.length.toString() + ' Offers Found');
    console.log('Cancelling Offers');
    try{
        const hot_wallet = xrpl.Wallet.fromSeed(xrp_account_secret);
        do {
            let offersToCancel = [];
            let totalInPayload = 0;
            for(let i = 0; i < offerObjects.length && totalInPayload <= 50; i++)
            {
                offersToCancel.push(offerObjects[i].index);
                totalInPayload++;
            }

            let cancelPayload = CancelOffers(offersToCancel);
            const cst_prepared_offer = await client.autofill(cancelPayload);
            const ts_signed_offer = hot_wallet.sign(cst_prepared_offer);
            const ts_result_offer = await client.submitAndWait(ts_signed_offer.tx_blob);
            if (ts_result_offer.result.meta.TransactionResult == "tesSUCCESS") {
                       console.log('cancelled ' + totalInPayload + ' Offers')
             }

            offerObjects.splice(0, totalInPayload);
        } while (offerObjects.length > 0)

    } catch(err) { console.log('Error cancelling offers: ' + err);}

    if(client.isConnected) {await client.disconnect();}

    return;
  }

  main()