CREATE DATABASE Hydrosense;

USE Hydrosense;

CREATE TABLE companys (
    id_company INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    company_ref INT,
    FOREIGN KEY (company_ref) REFERENCES companys(id_company)
);

CREATE TABLE engines (
    id_engine INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    HP INT NOT NULL,
    amperage INT NOT NULL,
    voltage INT NOT NULL,
    frequency INT NOT NULL,
    RPM INT NOT NULL,
    company_ref INT,
    FOREIGN KEY (company_ref) REFERENCES companys(id_company)
);

CREATE TABLE reports (
    id_report INT AUTO_INCREMENT PRIMARY KEY,
    tittle VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    data json NOT NULL,
    engine_ref_rep INT,
    FOREIGN KEY (engine_ref_rep) REFERENCES engines(id_engine)
);

CREATE TABLE datas (
    id_data INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME NOT NULL,
    data json NOT NULL,
    engine_ref_dat INT,
    FOREIGN KEY (engine_ref_dat) REFERENCES engines(id_engine)
);