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