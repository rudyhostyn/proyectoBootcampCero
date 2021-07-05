
const descMonedas = {
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
    TRX: 'TRON'
}

const xhr3 = new XMLHttpRequest()





var unicos = []

/*Renderizmaos la casilla valor*/
function sacaValor(){
    var dondeColocoInversion = document.querySelector("#colocarInversion")
    fila2 = document.createElement("p")
    valorInversion = parseFloat(document.querySelector(".eurosInversion").innerHTML)
    valorBeneficio = parseFloat(document.querySelector(".eurosBeneficio").innerHTML)
    var in2 = valorInversion-valorBeneficio
    fila2.innerHTML = in2.toFixed(2)
    dondeColocoInversion.appendChild(fila2)
}
/* Creamos una variable para controlar que siempe se compra la moneda actualizada*/
var ultimaCantidadFromActualizada
function grabaCantidadAComprar() {
    /* Creamos esta variable para evitar grabar un valor sin actualizar previamente */
    valor = document.querySelector("#cantidadFrom").value
    ultimaCantidadFromActualizada = parseFloat(valor)
    console.log(ultimaCantidadFromActualizada)    
}
function capturaFormMovimiento() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const grabacion = {}
    grabacion.date = date
    grabacion.time = time
    grabacion.moneda_from = document.querySelector("#monedaFrom").value
    grabacion.cantidad_from = document.querySelector("#cantidadFrom").value
    grabacion.moneda_to = document.querySelector("#monedaTo").value
    grabacion.cantidad_to = document.querySelector("#cantidadTo").innerHTML
    return grabacion    
}
/* Actualiza todos los datos en la pantalla tras comprar */
function refresca(){
    document.querySelectorAll('.paraBorrar').forEach(e => e.remove());
    window.location.reload()
}
/* Validación: no vender y comprar la misma moneda */
function valida1(){
    var monedaAvender = document.querySelector("#monedaFrom").value
    var monedaAcomprar = document.querySelector("#monedaTo").value
    if (monedaAcomprar === monedaAvender) {
        alert("La moneda a comprar y a vender no pueden ser las mismas")
        refresca()
    }else{
    valida2();
    }
}
/* Validación: cantidad a vender sin valor */
function valida2(){
    valorCasillaCantidadAComprarStr = document.querySelector("#cantidadTo").innerHTML
    valorCasillaCantidadAComprarFlt = parseFloat(valorCasillaCantidadAComprarStr)
    if (valorCasillaCantidadAComprarFlt !== 0 && valorCasillaCantidadAComprarStr !== ""){
        valida2a();
        }else{
            alert("No has puesto valor de venta")
            refresca()
        }
}
/* Validación: no se introduce un número en moneda a comprar */
function valida2a(){    
    valorCasillaCantidadAComprar = document.querySelector("#cantidadTo").innerHTML
    if (valorCasillaCantidadAComprar === "NaN"){
        alert("La cantidad de venta introducida no es válida")
        refresca()
        }else{                
            valida3();
        }
}
/* Validadión: No se realiza la operación si se cambia la cantidad a vender y no se actualiza */
function valida3(){
    valorStr = document.querySelector("#cantidadFrom").value
    valorFlt = parseFloat(valorStr)
    if (ultimaCantidadFromActualizada === valorFlt){
        valida4()
        }else{
            alert("Ha cambiado la cantidad a vender y no has actualizado")
            refresca()
        }    
}
 /* Validación: control de que se vende una cantidad mayor que cero */    
function valida4(){
    valorStr = document.querySelector("#cantidadFrom").value
    if (valorStr <= 0){
            alert("Introduce un valor numerico positivo")                
            refresca()
        }else{
            valida5();
        }
}
/* Validación: Control de no vender mas de lo que tenemos (excepto el Euro)*/ 
function valida5(){
var cantidadMaximaVenta = 0
var cantidadAVenderStr = document.querySelector("#cantidadFrom").value
var cantidadAVenderFlt = parseFloat(cantidadAVenderStr)

if (document.querySelector("#situacionMonedas").innerHTML.length === 0) {
    var cantidadMaximaVenta = cantidadAVenderFlt+1
}else{
    var cantidadMaximaVenta = document.querySelector(`.c_${document.querySelector("#monedaFrom").value}`).innerHTML
}
    if(document.querySelector("#monedaFrom").value !== "EUR"){
        if((cantidadMaximaVenta-cantidadAVenderFlt)>=0){
            llamaApiCreaMovimiento();
            }else{
                alert("No puedes vender tantas monedas")
                refresca()
            }
        }else{
            llamaApiCreaMovimiento();
        }

}
/* Función que graba las compras en la tabla (post) */
function llamaApiCreaMovimiento() {

    const grabacion = capturaFormMovimiento()
    const xhr2 = new XMLHttpRequest()     
    xhr2.open("POST", `http://localhost:5000/api/v1/movimiento`, true)
    xhr2.onload = refresca

    xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

    xhr2.send(JSON.stringify(grabacion))
}
/* Función que renderiza el importe invertido en la casilla invertido */
function ImporteInvertido() {
    
    if (this.readyState === 4 && this.status === 200) {
        const resp = JSON.parse(this.responseText)

        if (resp.status !== 'success') {
            alert("Se ha producido un error en la consulta de movimientos")
            return
        }
        
        const movimiento = resp.movimientos[0]
        const fila = document.createElement("p")
        fila.classList.add('eurosInversion')
        const dentro = movimiento.total
        fila.innerHTML = dentro.toFixed(2)
        tbody = document.querySelector("#colocarInversion2")
        tbody.appendChild(fila)
    }
}
function llamaApiImporteInvertido() {
    const xhr3 = new XMLHttpRequest() 
    xhr3.open('GET', `http://localhost:5000/api/v1/inversion`, true)
    xhr3.onload = ImporteInvertido
    xhr3.send()
}
/* Función que renderiza el beneficio en la casilla resultado */
function importeBeneficio() {
    
    if (this.readyState === 4 && this.status === 200) {
        const resp = JSON.parse(this.responseText)

        if (resp.status !== 'success') {
            alert("Se ha producido un error en la consulta de movimientos")
            return
        }
        
        const movimiento = resp.beneficio
        const fila = document.createElement("p")
        fila.classList.add('eurosBeneficio')
        fila.innerHTML = movimiento.toFixed(2)
        tbody = document.querySelector("#colocarStatus")
        tbody.appendChild(fila)
    }
    sacaValor();
}
function llamaApiImporteBeneficio(){
    const xhr13 = new XMLHttpRequest() 
    xhr13.open('GET', `http://localhost:5000/api/v1/beneficio`, true)
    xhr13.onload = importeBeneficio
    xhr13.send()
}
/* Función que renderiza el histórico de movimientos */
function historicoMovimientos() {
    
    if (this.readyState === 4 && this.status === 200) {
        const resp = JSON.parse(this.responseText)

        if (resp.status !== 'success') {
            alert("Se ha producido un error en la consulta de movimientos")
            return
        }        
        for (let i = 0; i < resp.movimientos.length; i++){
            const movimiento = resp.movimientos[i]
            const fila = document.createElement("tr")
            fila.classList.add('paraBorrar')
            const dentro =`
                <td id="c_date">${movimiento.date}</td>        
                <td id="c_time">${movimiento.time}</td>
                <td id="c_moneda_from">${movimiento.moneda_from}</td>
                <td id="c_cantidad_from">${movimiento.cantidad_from}</td>
                <td id="c_moneda_to">${movimiento.moneda_to}</td>
                <td id="c_cantidad_to">${movimiento.cantidad_to}</td>
            `
            fila.innerHTML = dentro
            tbody = document.querySelector(".tabla-movimientos tbody")
            tbody.appendChild(fila)
        }
    }
    llamaApiImporteBeneficio();
}
function llamaApiHistoricoMovimientos() {
    const xhr2 = new XMLHttpRequest()
    xhr2.open('GET', `http://localhost:5000/api/v1/movimientos`, true)
    xhr2.onload = historicoMovimientos
    xhr2.send()
}
/* Renderiza una tabla que muestra las monedas que tienen saldo y su saldo */
function tablaMonedasCantidad(){
    
    if (this.readyState === 4 && this.status === 200) {
        const resp1 = JSON.parse(this.responseText)

        if (resp1.status !== 'success') {
            alert("Se ha producido un error en la consulta de movimientos")
            return
        }
        /* Tabla que muestra las monedas que tienen saldo y su saldo */
        aaa=document.querySelector("#situacionMonedas")
        keys = Object.keys(resp1.movimientos)
        for (let i = 0; i < keys.length; i++){
            const monCodigo = Object.keys(resp1.movimientos)[i]
            const monValor = Object.values(resp1.movimientos)[i]
            if (monCodigo !== 0.0) {
            const fila = document.createElement("tr")
            const monedaCod =`
                <td class ="v_${monCodigo}">${monCodigo ? descMonedas[monCodigo] : ""}</td>        
                <td class ="c_${monCodigo}">${monValor}</td>
                `
            fila.innerHTML = monedaCod
            aaa.appendChild(fila)  
            }
        }       
    }
    llamaApiHistoricoMovimientos();
}
function llamaApiTablaMonedasCantidad() {
    const grabacion = capturaFormMovimiento()
    xhr7 = new XMLHttpRequest()
    xhr7.open("GET", `http://localhost:5000/api/v1/saldo`, true)
    xhr7.onload = tablaMonedasCantidad
    xhr7.send()
}
/* Renderiza en moneda a vender solamente las monedas que tienen saldo y, siempre, el Euro*/
function MonedasConSaldo(){
    if (this.readyState === 4 && this.status === 200) {
        const resp = JSON.parse(this.responseText)

        if (resp.status !== 'success') {
            alert("Se ha producido un error en la consulta de movimientos")
            return
        }
        if  (resp.movimientos.length === 0) {
                const monedaDentro = "<td id='c_EUR'>Euro</td>"
                const filas = document.createElement("option")
                filas.setAttribute("value","EUR")
                filas.innerHTML = monedaDentro
                monedasStock = document.querySelector("#monedaFrom")
                monedasStock.appendChild(filas)
            }else{     
            for (let i = 0; i < resp.movimientos.length; i++){
                const movimiento = resp.movimientos[i]
                const filas = document.createElement("option")
                filas.setAttribute("value", movimiento.monedaCodigo)
                const monedaDentro =`<td id='c_moneda_from'>${movimiento.monedaCodigo ? descMonedas[movimiento.monedaCodigo] : ""}</td>`
                filas.innerHTML = monedaDentro
                monedasStock = document.querySelector("#monedaFrom")
                monedasStock.appendChild(filas)
                unicos.push(movimiento.monedaCodigo)
            }
        }
    }
    llamaApiTablaMonedasCantidad();
}
function llamaApiMonedasConSaldo() {
    xhr4 = new XMLHttpRequest()
    xhr4.open('GET', `http://localhost:5000/api/v1/unicos`, true)
    xhr4.onload = MonedasConSaldo
    xhr4.send()
}
window.onload = function() {
    llamaApiMonedasConSaldo();  
    llamaApiImporteInvertido();
    
    document.querySelector("#grabaValor")
        .addEventListener("click", valida1);
    document.querySelector("#actualizaValor")
        .addEventListener("click", grabaCantidadAComprar)    
}