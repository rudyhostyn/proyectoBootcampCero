# Proyecto fin de Curso

Curso Progrmación Moderna con Python
KeepCoding
7ª edición

## Comenzando 🚀

Clona este repositorio en tu equipo.


### Pre-requisitos 📋

1.- Código para crear la base de datos en entorno real:

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

2.- En el entono virtual la base de datos está creada sin datos

3.- Consigue tu clave de "https://coinmarketcap.com/api/" e introducela en el fichero config.py

### Instalación 🔧

1.- Crea un entorno virtual:
python -m venv "nombre de tu entorno"

2.- Inicia el entorno virtual
En Windows, ejecuta:
"nombre de tu entorno"\Scripts\activate.bat
En Unix o MacOS, ejecuta:
"nombre de tu entorno"/bin/activate

3.- Descaga los modulos necesarios. Desde el entorno visrtual ejecutar:
pip install -r requirements.txt

4.- Inicia la aplicación ejecutando desde el entorno virtual:
flask run


## Construido con 🛠️

Python
CSS
JavaScript
HTML

## Autor ✒️

* **Rudy Hostyn** - *Trabajo Inicial* - [Rudy Hostyn](https://github.com/rudyhostyn)
* **Ramón Maldonado** - *Profesor* - [Ramón Maldonado](https://github.com/pigmonchu)

## Licencia 📄

Este proyecto está bajo la Licencia  [Licencia Pública General de GNU](https://www.gnu.org/licenses/gpl.html)

## Expresiones de Gratitud 🎁

* Quiero agradecer a Ramón Maldonado por consegur en apenas 3 meses transmitirnos, partiendo de cero, la posibilidad de crear este proyecto.
* También agradecer a [KeepCoding]( https://keepcoding.io/) su buena organización.
