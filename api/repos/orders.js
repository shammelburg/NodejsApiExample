const sql = require('mssql');
const sqlConfig = require('../../settings/mssql-config');

// MS SQL Repo

exports.spGetAllProducts = async (level) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('Level', sql.Int, level)
            .execute('spGetAllProducts')

        return result;
    } catch (err) {
        throw err;
    } finally {
        sql.close();
    }
}

exports.spGetUsers = async () => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .execute('[dbo].[spGetUsers]')

        return result;
    } catch (err) {
        throw err;
    } finally {
        sql.close();
    }
}
