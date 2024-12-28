const db = require('../config/db.config.js');
const fs = require('fs');

const backup = async (req, res) => {
    try {
        const timestamp = new Date().toISOString();
        const backupPath = '/var/opt/mssql/backups/backup_' + timestamp + '.bak';
        const query = `BACKUP DATABASE ${process.env.DB_NAME} TO DISK = '${backupPath}'WITH INIT;`;
        await db.sequelize.query(query);

        return res.status(200).json({
            message: `Database backed up`,
            backupPath,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const restore = async (req, res) => {
    const { backupFileName } = req.body;
    try {
        let query = `USE master;`;
        await db.sequelize.query(query);

        query = `RESTORE DATABASE ${process.env.DB_NAME} FROM DISK = N'${backupFileName}' WITH REPLACE;`;
        await db.sequelize.query(query);

        query = `USE ${process.env.DB_NAME};`;
        await db.sequelize.query(query);
        
        return res.status(200).json({
            message: 'Database restored successfully',
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    backup,
    restore
};