# Proyecto fin de Curso

Curso Progrmaci贸n Moderna con Python
KeepCoding
7陋 edici贸n

## Comenzando 馃殌

Clona este repositorio en tu equipo.


### Pre-requisitos 馃搵

1.- C贸digo para crear la base de datos en entorno real:

CREATE TABLE "dbmovimientos" (
	"id"	INTEGER,
	"date"	TEXT NOT NULL,
	"time"	TEXT NOT NULL,
	"moneda_from"	REAL NOT NULL,
	"cantidad_from"	REAL NOT NULL,
	"moneda_to"	REAL NOT NULL,
	"cantidad_to"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
)

2.- En el entono virtual la base de datos est谩 creada sin datos

3.- Consigue tu clave de "https://coinmarketcap.com/api/" e introducela en el fichero config.py

### Instalaci贸n 馃敡

1.- Crea un entorno virtual:
python -m venv "nombre de tu entorno"

2.- Inicia el entorno virtual
En Windows, ejecuta:
"nombre de tu entorno"\Scripts\activate.bat
En Unix o MacOS, ejecuta:
"nombre de tu entorno"/bin/activate

3.- Descaga los modulos necesarios. Desde el entorno visrtual ejecutar:
pip install -r requirements.txt

4.- Inicia la aplicaci贸n ejecutando desde el entorno virtual:
flask run


## Construido con 馃洜锔?

Python
CSS
JavaScript
HTML

## Autor 鉁掞笍

* **Rudy Hostyn** - *Trabajo Inicial* - [Rudy Hostyn](https://github.com/rudyhostyn)
* **Ram贸n Maldonado** - *Profesor* - [Ram贸n Maldonado](https://github.com/pigmonchu)

## Licencia 馃搫

Este proyecto est谩 bajo la Licencia  [Licencia P煤blica General de GNU](https://www.gnu.org/licenses/gpl.html)

## Expresiones de Gratitud 馃巵

* Quiero agradecer a Ram贸n Maldonado por consegur en apenas 3 meses transmitirnos, partiendo de cero, la posibilidad de crear este proyecto.
* Tambi茅n agradecer a [KeepCoding]( https://keepcoding.io/) su buena organizaci贸n.
