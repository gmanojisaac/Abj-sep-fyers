var fyersModel = require("fyers-api-v3").fyersModel;
let DataSocket = require("fyers-api-v3").fyersDataSocket;

var fyers = new fyersModel({ "logs": "path where you want to save logs", "enableLogging": false });

fyers.setAppId("R3PYOUE8EO-100");

var accesstoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE3MjUzMzg3NTMsImV4cCI6MTcyNTQwOTg1MywibmJmIjoxNzI1MzM4NzUzLCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIiwieDoxIiwieDowIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCbTFwU0JNNXdlU0xZR0tmZVk4LXg2LWREU1RjcHo2alNLeGZCTDlHQTlmdE1pR25wM2Q5RlRXZ21pZWpFYlpoM2J0dE5UMm9IcDZqakZiSEtaWW96NlBUTjByRUFUOXo2Y2NMam9YbW83Z1h0bTIzST0iLCJkaXNwbGF5X25hbWUiOiJNQU5PSiBJU0FBQyBHT0RXSU4iLCJvbXMiOiJLMSIsImhzbV9rZXkiOiJjZWIzMzlkYWE3YzUyODg4Y2JhMzAxNDg0YmY3YjBhMWEwNWZmM2Y4YTYyNDY4OGVhZTUwOGFjYyIsImZ5X2lkIjoiWE0yNzE4MyIsImFwcFR5cGUiOjEwMCwicG9hX2ZsYWciOiJOIn0.Pmrl1cGMwq3FLMZckraG6Z06jUUkVsHjOQvueqXtEXI";
fyers.setAccessToken(accesstoken);

var Dataskt = DataSocket.getInstance(accesstoken,);

var CEOption = 'NSE:BANKNIFTY2490451600CE';
var PEOption = 'NSE:BANKNIFTY2490451300PE';

OptionArr= [CEOption,  PEOption];
singleTradeCE= true;
singleTradePE= false;

Dataskt.on("connect",function(){
    Dataskt.subscribe(OptionArr) 
    //subscribing for market depth data if need of market depth comes as a diffrent tick
    Dataskt.subscribe(OptionArr,true) 
    //to start lite mode to get fewer data like ltp change
    Dataskt.mode(Dataskt.LiteMode) 
    //to revert back to full mode
    // Dataskt.mode(Dataskt.FullMode) 
})

Dataskt.on("message",function(message){
    //console.log({"TEST":message})
    if(message.ltp !== undefined){
        switch (message.symbol){
            case CEOption:
                
                if(singleTradeCE == true){
                    console.log("CEOption" , '/', message.ltp);
                    const reqBody={
                        // "symbol": CEOption,
                        // "qty": 15,
                        // "type": 1, //limit 1
                        // "side": 1, //buy
                        // "productType": "INTRADAY",
                        // "limitPrice": (message.ltp + 0.5),
                        // //"stopPrice": 0,
                        // "disclosedQty": 0,
                        // "validity": "DAY",
                        // "offlineOrder": false,

                        // "orderTag": "tag1",

                        // "stopLoss":  20,           // Stop-loss price
                        // "takeProfit": 10,         // Take-profit price

                        // //"stopLossTrigger": 75,    // Stop-loss trigger price
                        // "orderType": "BO"             // Order type as Bracket Order (BO)

                        //WORKING
                        //  "symbol": "NSE:SBIN-EQ", 
                        //  "qty": 10, 
                        //  "type": 1,  //limit -1
                        //  "side": 1, //buy -1 sell - -1
                        //  "productType": "BO", //BO
                        //  "limitPrice": 820, 
                        //  "stopPrice": 0, 
                        //  "validity": "DAY", //BO-Day

                        //  "stopLoss": 800, //M-BO 800
                        //  "takeProfit": 830, //M-BO 830
                        //  "offlineOrder": false, 
                        //  "disclosedQty": 0  //BO-0


                         //TRY
                         "symbol": CEOption, 
                         "qty": 15, 
                         "type": 1,  //limit -1
                         "side": 1, //buy -1 sell - -1
                         "productType": "BO", //BO
                         "limitPrice": (message.ltp + 0.5), 
                         "stopPrice": 0, 
                         "validity": "DAY", //BO-Day

                         "stopLoss": (message.ltp * 0.9), //M-BO 800
                         "takeProfit": (message.ltp * 1.1), //M-BO 830
                         "offlineOrder": false, 
                         "disclosedQty": 0  //BO-0


                         //bO
                        //  stopLoss is a mandatory input
                        // takeProfit is a mandatory input
                        // The stopLoss and takeProfit are denominated in rupees above and below the trade price. (Eg: SBIN LTP = 300. So the user can give a target of Rs. 10 and stop loss or Rs. 5.)
                        // Order type can be either market, limit, stop, or stop limit
                        // Validity should be “DAY.”
                        // Disclosed quantity should be 0

                  }


               fyers.place_order(reqBody).then((response) => {
                 console.log(response, message.ltp)
               }).catch((error) => {
                   console.log(error, message.ltp)
               })
               singleTradeCE = false;
                }


            break;
            case PEOption:
                
                if(singleTradePE == true){
                    console.log("PEOption" , '/', message.ltp);
                    const reqBody={
                        symbol: PEOption, // Replace with your desired symbol
                        qty: 15,                     // Quantity
                        type: 1,                    // Order type (1 for limit)
                        side: 1,                    // 1 for Buy, -1 for Sell
                        productType: "INTRADAY",    // Product type
                        limitPrice: message.ltp + 0.5,       // Limit price
                        stopLoss:  message.ltp * 0.9,           // Stop-loss price
                        takeProfit: message.ltp * 1.04,         // Take-profit price
                        disclosedQty: 0,            // Disclosed quantity
                        validity: "DAY",            // Validity
                        offlineOrder: "False",      // Online order
                        stopLossTrigger: message.ltp * 0.91,    // Stop-loss trigger price
                        orderType: "BO"             // Order type as Bracket Order (BO)
                  }


               fyers.place_order(reqBody).then((response) => {
                 console.log(response)
               }).catch((error) => {
                   console.log(error)
               })
               singleTradePE = false;
                }
            break;
        }
    }

})

Dataskt.on("error",function(message){
    //console.log("erroris",message)
})

Dataskt.on("close",function(){
    //console.log("socket closed")
})
    
Dataskt.connect()