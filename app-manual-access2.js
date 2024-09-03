var fyersModel = require("fyers-api-v3").fyersModel

var fyers = new fyersModel({ "logs": "path where you want to save logs", "enableLogging": true })

fyers.setAppId("R3PYOUE8EO-100")

fyers.setRedirectUrl("https://trade.fyers.in/api-login/redirect-uri/index.html")

var URL = fyers.generateAuthCode()

console.log(URL);

var authcode = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubG9naW4uZnllcnMuaW4iLCJpYXQiOjE3MjUzMzg1MDcsImV4cCI6MTcyNTM2ODUwNywibmJmIjoxNzI1MzM3OTA3LCJhdWQiOiJbXCJ4OjBcIiwgXCJ4OjFcIiwgXCJ4OjJcIiwgXCJkOjFcIiwgXCJkOjJcIiwgXCJ4OjFcIiwgXCJ4OjBcIl0iLCJzdWIiOiJhdXRoX2NvZGUiLCJkaXNwbGF5X25hbWUiOiJYTTI3MTgzIiwib21zIjoiSzEiLCJoc21fa2V5IjoiY2ViMzM5ZGFhN2M1Mjg4OGNiYTMwMTQ4NGJmN2IwYTFhMDVmZjNmOGE2MjQ2ODhlYWU1MDhhY2MiLCJub25jZSI6IiIsImFwcF9pZCI6IlIzUFlPVUU4RU8iLCJ1dWlkIjoiZWI1MWE0MDI0YmQ2NGIxY2FhM2M2MmUwMGVkMzc2NzgiLCJpcEFkZHIiOiIwLjAuMC4wIiwic2NvcGUiOiIifQ.NVe_F_k5Zf2wIhcg81GeAOEo3WC7kzJRmEjSnirkiAk";
var accesstoken="";


if (accesstoken == '') {
    fyers.generate_access_token({ "client_id": "R3PYOUE8EO-100", "secret_key": "O785RGL68D", "auth_code": authcode }).then((response) => {
        if (response.s == 'ok') {
            fyers.setAccessToken(response.access_token)
            console.log(response.access_token);
        } else {
            console.log("error generating access token", response)
        }
    })
}

//change client id - 2 places and also secret key and alos authcode