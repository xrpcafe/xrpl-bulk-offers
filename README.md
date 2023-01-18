# Create bulk Sell and Cancel offers on the XRPL

### Features
+ Create sell offers for X amount with X Expiration for NFTs with a certain token taxon/issuer that reside in the user's account
+ Cancel all offers on an account

### Requirements

+ [NodeJs](https://nodejs.org/en/)
+ [Git](https://git-scm.com/downloads)

## Getting Started

### Open a command prompt or Powershell prompt and issue the following commands

```
git clone https://github.com/xrpcafe/xrpl-bulk-offers
```

### in the ./config directory edit the default.json file with the information about your mint.
```
{
    "XRPL_Server": "wss://s.altnet.rippletest.net:51233/",
    "Account" : "rL8RMQZhA1Wycu8AP4cNLEQRCthuwARsPs",
    "Secret_Key" : "",
    "Sell":
    {
        "Issuer": "",
        "Taxon": 0,
        "XRP_Price": 10,
        "Expiration": "2023-01-22 00:00:00"
    }
  }
  ```
1. XRPL_Server: the wss server of the public XRPL endpoint. Testnet: wss://s.altnet.rippletest.net:51233/  Main Net: wss://s1.ripple.com/    wss://xrplcluster.com/
 - Public Main Net servers: [Servers](https://xrpl.org/public-servers.html)
2. Account: Your xrp account address. [XRPL Faucet](https://xrpl.org/xrp-testnet-faucet.html)
3. Secret_Key: the family seed for your xrp address. If you activated from XUMM you'll need to convert your secret numbers to a Family seed [https://github.com/WietseWind/secret-numbers-to-family-seed](https://github.com/WietseWind/secret-numbers-to-family-seed)
 ```diff
- KEEP THIS SAFE, DO NOT SHARE!!!
```
4. Issuer: the issuer of the NFT to create the sell offers against
5. Taxon: the token taxon to create the sell offers against
6. XRP_Price: Price in XRP to set the sell offers for
7. Expiration: Expiration for the sell offers in UTC time format YYYY-MM-DD HH:MM:SS (leave as an empty string for no expiration)

### Install
``` npm install ``` 

### Run Bulk Sell
``` node bulk-sell.js ``` 

### Cancel All Offers on Account
``` node cancel.js ``` 


