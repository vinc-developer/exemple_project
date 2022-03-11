const Address = require("../../models/Address");
const log = require("../../../log/logger");
const database = require("../tools/database");

const SQL_INSERT = `INSERT INTO address (number, street, additional_address, zipcode, city, country) VALUES (?, ?, ?, ?, ?, ?)`;
const SELECT_BY_ID = `SELECT * FROM address WHERE id = ?`;
const SQL_DELETE = `DELETE FROM address WHERE id = ?`;

async function insert(Address) {
    let con = null;
    try{
        con = await database.getConnection();
        const [idCreated] = await con.execute(SQL_INSERT, [Address.number, Address.street, Address.additionalAddress, Address.zipCode, Address.city, Address.country]);
        const id = idCreated.insertId;
        const address = await getById(id);
        return address;
    }catch (error) {
        log.error("Error addressDAO insert : " + error);
    } finally {
        if (con !== null) {
            con.end();
        }
    }
}

async function getById(id) {
    let con = null;
    try{
        con = await database.getConnection();
        const [a] = await con.execute(SELECT_BY_ID, [id]);
        const newAddress = new Address(a[0].id, a[0].number, a[0].street, a[0].additional_address, a[0].zipcode, a[0].city, a[0].country);
        return newAddress;
    }catch (error) {
        log.error("Error addressDAO getById : " + error);
    } finally {
        if (con !== null) {
            con.end();
        }
    }
}

async function remove(id) {
    let connexion = null;
    try{
        connexion = await database.getConnection();
        await connexion.execute(SQL_DELETE, [id]);
    } catch(e) {
        log.error("Error in remove addressDao : " + e);
    } finally {
        if (connexion !== null) {
            connexion.end();
        }
    }
}

module.exports = {
    insert,
    getById,
    remove
}
