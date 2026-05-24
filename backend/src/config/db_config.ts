import { Pool } from 'pg';
require('dotenv').config();

const baseConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 25060,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    keepAlive: true,
};

const db = new Pool({
    ...baseConfig,
    database: process.env.DB_NAME,
    max: 5,
});

db.query('SELECT NOW()')
    .then(() => console.log('[MAIN DB] Conectado com sucesso!'))
    .catch((err) => {
        console.error('[MAIN DB] Erro fatal:', err.message);
        process.exit(1);
});

export default db;