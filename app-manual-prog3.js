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
                console.log("CEOption" , '/', message.ltp);
            break;
            case PEOption:
                console.log("PEOption" , '/',  message.ltp);
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