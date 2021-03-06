from werkzeug.wrappers import response
from myCripto import app
from flask import jsonify, render_template, request
from http import HTTPStatus
import sqlite3
from myCripto.dataaccess import DBmanager
from config import API_COINMARKET
from config import IP_ADDRESS
import jinja2

import requests
import json

dbManager = DBmanager(app.config.get('DATABASE'))

@app.route('/')
def index():
    data = [IP_ADDRESS]
    return render_template("home.html", data=json.dumps(data))

@app.route('/api/v1/movimientos')
def movimientosAPI():        
    query = "SELECT * FROM dbmovimientos;"
    movimientos = dbManager.consultaMuchasSQL(query)
    try:
        return jsonify({'status': 'success', 'movimientos': movimientos})
    except sqlite3.Error as e:
        return jsonify({'status': 'fail', 'mensaje': str(e)})
    
@app.route('/api/v1/movimiento', methods=['POST'])
def grabar():
    dbManager.modificaTablaSQL("""
        INSERT INTO dbmovimientos 
                    (date, time, moneda_from, cantidad_from, moneda_to, cantidad_to)
            VALUES (:date, :time, :moneda_from, :cantidad_from, :moneda_to, :cantidad_to) 
        """, request.json)
    return jsonify({"status": "success", "mensaje": "registro creado"})

@app.route('/api/v1/saldo')
def saldo():
    query = """	WITH resultado AS
            (
            SELECT dbmovimientos.moneda_from AS monedaCodigo , -Sum(dbmovimientos.cantidad_from) AS total FROM dbmovimientos GROUP by moneda_from
            UNION ALL
            SELECT dbmovimientos.moneda_to AS monedaCodigo , Sum(dbmovimientos.cantidad_to) AS total FROM dbmovimientos GROUP BY	moneda_to
            )
            SELECT monedaCodigo, sum(total) AS monedaSaldo FROM resultado GROUP BY monedaCodigo;"""
    movimientos = dbManager.consultaMuchasSQL(query)

    a = {}
    
    for i in range (0, len(movimientos)):
        codigo = movimientos[i]["monedaCodigo"]
        cantidad = movimientos[i]["monedaSaldo"]
        a[codigo]=cantidad
    
    try:
        return jsonify({'status': 'success', 'movimientos': a})
    except sqlite3.Error as e:
        return jsonify({'status': 'fail', 'mensaje': str(e)})

@app.route('/api/v1/par/<_from>/<_to>/<quantity>')
@app.route('/api/v1/par/<_from>/<_to>')
def par(_from, _to, quantity = 1.0):
    clave = API_COINMARKET
    url = f"https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount={quantity}&symbol={_from}&convert={_to}&CMC_PRO_API_KEY={API_COINMARKET}"
      
    res = requests.get(url)
    aa = res.json()

    if aa['status']['error_code'] == 0:
        return aa
    else:
        bb = aa['status']['error_message']
        print(bb)
        return bb
    
   


@app.route('/api/v1/inversion')
def inversionAPI():
    query = '''SELECT dbmovimientos.moneda_from AS monedaCodigo , Sum(dbmovimientos.cantidad_from) AS total 
                    FROM dbmovimientos 
                    WHERE moneda_from="EUR" 	
                    GROUP by moneda_from;'''
    movimientos = dbManager.consultaMuchasSQL(query)

    try:
        return jsonify({'status': 'success', 'movimientos': movimientos})
    except sqlite3.Error as e:
        return jsonify({'status': 'fail', 'mensaje': str(e)})

@app.route('/api/v1/unicos')
def unicos():
    try:
        query = """	
                WITH unicos AS (
                    WITH resultado AS (
                        SELECT dbmovimientos.moneda_from AS monedaCodigo , -Sum(dbmovimientos.cantidad_from) AS total FROM dbmovimientos GROUP by moneda_from
                        UNION ALL
                        SELECT dbmovimientos.moneda_to AS monedaCodigo , Sum(dbmovimientos.cantidad_to) AS total FROM dbmovimientos GROUP BY	moneda_to
                    )
                    SELECT monedaCodigo, sum(total) AS monedaSaldo FROM resultado GROUP BY monedaCodigo
                )
                SELECT monedaCodigo  FROM unicos WHERE monedaSaldo <> 0;"""
        movimientos = dbManager.consultaMuchasSQL(query)
    
        return jsonify({'status': 'success', 'movimientos': movimientos})
    except sqlite3.Error as e:
        return jsonify({'status': 'fail', 'mensaje': str(e)})

@app.route('/api/v1/valor')
def valor():

    query = """	
            WITH unicos AS (
                WITH resultado AS (
                    SELECT dbmovimientos.moneda_from AS monedaCodigo , -Sum(dbmovimientos.cantidad_from) AS total FROM dbmovimientos GROUP by moneda_from
                    UNION ALL
                    SELECT dbmovimientos.moneda_to AS monedaCodigo , Sum(dbmovimientos.cantidad_to) AS total FROM dbmovimientos GROUP BY	moneda_to
                )
                SELECT monedaCodigo, sum(total) AS monedaSaldo FROM resultado GROUP BY monedaCodigo
            )
            SELECT monedaCodigo  FROM unicos WHERE monedaSaldo <> 0;"""
    movimiento = dbManager.consultaMuchasSQL(query)

    a = {}
    
    for i in range (0, len(movimiento)):
        clave = movimiento[i]['monedaCodigo']
        if clave != "EUR":
            url = f"http://{IP_ADDRESS}/api/v1/par/{clave}/EUR"
            devuelve = requests.get(url)
            dev = devuelve.json()
            valor = dev['data']['quote']['EUR']['price']
            a[clave]=valor
        else:
            a["EUR"]=1
    try:
        return jsonify({'status': 'success', 'movimientos': a})
    except sqlite3.Error as e:
        return jsonify({'status': 'fail', 'mensaje': str(e)})


@app.route('/api/v1/beneficio')
def beneficio():
   
    query = """	
            WITH resultado AS
            (
            SELECT dbmovimientos.moneda_from AS monedaCodigo , -Sum(dbmovimientos.cantidad_from) AS total FROM dbmovimientos GROUP by moneda_from
            UNION ALL
            SELECT dbmovimientos.moneda_to AS monedaCodigo , Sum(dbmovimientos.cantidad_to) AS total FROM dbmovimientos GROUP BY	moneda_to
            )
            SELECT monedaCodigo, sum(total) AS monedaSaldo FROM resultado GROUP BY monedaCodigo;
            """
    movimiento = dbManager.consultaMuchasSQL(query)

    ValorActual = 0
    for i in range (0, len(movimiento)):
        clave = movimiento[i]['monedaCodigo']
        if clave != "EUR":
            url = f"http://{IP_ADDRESS}/api/v1/par/{clave}/EUR"
            devuelve = requests.get(url)
            dev = devuelve.json()
            valor = dev['data']['quote']['EUR']['price']
            cantidad = movimiento[i]["monedaSaldo"]
            ValorActual = ValorActual + valor * cantidad
        else:
            cantidad = movimiento[i]["monedaSaldo"]
            ValorActual = ValorActual + cantidad
    try:
        return jsonify({'status': 'success', 'beneficio': ValorActual })
    except sqlite3.Error as e:
         print('SQLite error: %s' % (' '.join(e.args)))

