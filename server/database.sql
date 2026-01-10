CREATE TABLE IF NOT EXISTS Pharmacist (
    Pharm_id TEXT NOT NULL UNIQUE,
    Pharm_name TEXT NOT NULL,
    Pharm_email TEXT NOT NULL UNIQUE,
    Pharm_address TEXT NOT NULL,
    Pharm_mobile TEXT NOT NULL,
    Pharm_gender TEXT NOT NULL,
    User_name TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    PRIMARY KEY (Pharm_id)
);

CREATE TABLE IF NOT EXISTS Customer (
    Cust_id TEXT NOT NULL,
    Cust_name TEXT NOT NULL,
    Cust_age INTEGER NOT NULL,
    Cust_gender TEXT NOT NULL,
    Cust_address TEXT NOT NULL,
    Cust_mobileno TEXT NOT NULL,
    PRIMARY KEY (Cust_id)
);

CREATE TABLE IF NOT EXISTS Medicine (
    Med_id INTEGER PRIMARY KEY AUTOINCREMENT,
    Med_name TEXT NOT NULL,
    Med_price INTEGER NOT NULL,
    Purch_date TEXT NOT NULL,
    Pharm_id TEXT,
    Cust_id TEXT,
    FOREIGN KEY (Pharm_id) REFERENCES Pharmacist(Pharm_id) ON DELETE CASCADE,
    FOREIGN KEY (Cust_id) REFERENCES Customer(Cust_id) ON DELETE CASCADE
);

CREATE VIEW IF NOT EXISTS PURCHASES AS SELECT Med_price, Purch_date FROM Medicine;
