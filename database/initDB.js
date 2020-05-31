// Create database if not exist
const initDB = async () => {
    const { Client } = require('pg');
    const username = 'postgres';
    const password = 'gqtygjhidt1124';
    const host = 'localhost';
    const port = '5432';
    const client = new Client(`postgres://${username}:${password}@${host}:${port}`);
    const dbName = 'backend_test';

    console.log(`Initializing database...\n`);

    console.log(`Trying to connect to Postgres and create database ${dbName}\n`);

    await client.connect();

    try {
        const res = await client.query(`CREATE DATABASE ${dbName}`);
        console.log(`Database:${dbName} created!\n`);

    } catch (e) {
        console.log(`Database:${dbName} already exists\n`);
    }
}

module.exports = {
    initDB
}