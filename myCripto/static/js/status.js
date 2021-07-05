/*const descMonedas2 = {
    EUR: 'Euro',
    BTC: 'Bitcoin', 
    ETH: 'Ethereum',
    XRP: 'XRP', 
    LTC: 'Debian', 
    BCH: 'Bitcoin Cash',
    BNB: 'Binance Coin',
    USDT: 'Tether',
    EOS: 'EOS',
    BSV: 'Bitcoin SV',
    XLM: 'Stellar',
    ADA: 'Cardano',
    TRX: 'TRON',
}*/
const descMonedas2 = {
    EUR: 'Euro',
    BTC: 'Bitcoin', 
}
/*alert(localStorage.length);*/
var index = Object.keys(descMonedas2)
var valorActualMonedas = {}

function sacaValorMonedas1(){
    for (var i = 0; i < index.length; i++) {
        var url = `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=1&symbol=${index[i]}&convert=EUR&CMC_PRO_API_KEY=0b92c0c3-80c0-40a5-8611-295434c86c96`
        var url = 
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.onreadystatechange = function() {
            if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var data = JSON.parse(request.responseText);
                divisa2 = Object.keys(data.data.quote)[0]
                valor = `data.data.quote.${divisa2}.price`    
                valorActualMonedas[data.data.name] = eval(valor)
            }            
        }
        request.send();
    }
}

    /*https://stackoverflow.com/questions/46503558/how-to-use-multiple-xmlhttprequest/46503763*/