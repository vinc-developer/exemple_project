const log = require("../../../log/logger");
const database = require("../tools/database");
const User = require("../../models/Users");

const SELECT_ALL = `SELECT * FROM user`;
const SELECT_EMAIL = `SELECT id FROM user WHERE email = ?`;
const SQL_INSERT = `INSERT INTO user SET firstname = ?, lastname = ?, email = ?, password = ?, date_of_birthday = ?, id_address= ?, date_created = ?`;
const SQL_DELETE = `DELETE FROM user WHERE id = ?`;
const SELECT_USER_WITH_ADDRESS = `SELECT u.id, u.firstname, u.lastname, u.email, u.password, u.date_of_birthday, u.date_created,
                                         (SELECT JSON_OBJECT(
                                                 'id',a.id,
                                                 'number', a.number,
                                                 'additionalAddress', a.additional_address,
                                                 'zipCode', a.zipcode,
                                                 'city', a.city,
                                                 'country', a.country)
                                          FROM address a WHERE a.id = u.id_address ) AS address
                                  FROM user u WHERE u.id = ?`;

async function getById(id) {
    let connexion = null;
    try{
        connexion = await database.getConnection();
        const [user] = await connexion.execute(SELECT_USER_WITH_ADDRESS, [id]);
        const userClass = new User(user[0].id, user[0].firstname, user[0].lastname, user[0].email, user[0].password, user[0].date_of_birthday, user[0].address,  user[0].date_created);
        return userClass;
    } catch(e) {
        log.error("Error in getById dao : " + e);
    } finally {
        if (connexion !== null) {
            connexion.end();
        }
    }
}

async function getAll() {
    let con = null;
    try{
        con = database.getConnection();
        const [users] = await con.execute(SELECT_ALL);
        let listUsers = [];
        for (let i = 0; i < users.length; i++) {
            const user = await getById(users[i].id);
            listUsers.push(user);
        }
        return listUsers;
    } catch(e) {
        log.error("Error in getALl dao : " + e);
    } finally {
        if (con !== null) {
            con.end();
        }
    }
}

async function register(User) {
    let con = null;
    const date = new Date();
    try{
        con = await database.getConnection();
        const [idCreated] = await con.execute(SQL_INSERT, [User.firstname, User.lastname, User.email, User.password, User.dateOfBirthday, User.address, date]);
        const id = idCreated.insertId;
        const user = await getById(id);
        return user;
    }catch (error) {
        log.error("Error userDAO register : " + error);
    } finally {
        if (con !== null) {
            con.end();
        }
    }
}

async function updateUser(User) {

}

async function remove(id) {
    let connexion = null;
    try{
        connexion = await database.getConnection();
        await connexion.execute(SQL_DELETE, [id]);
    } catch(e) {
        log.error("Error in remove dao : " + e);
    } finally {
        if (connexion !== null) {
            connexion.end();
        }
    }
}

async function getEmail(email) {
    let connexion = null;
    try{
        connexion = await database.getConnection();
        const [id] = await connexion.execute(SELECT_EMAIL, [email]);
        if (id.length > 0) {
          return true;
        } else{
            return false;
        }

    } catch(e) {
        log.error("Error in getById dao : " + e);
    } finally {
        if (connexion !== null) {
            connexion.end();
        }
    }
}

module.exports = {
    getById,
    getAll,
    register,
    updateUser,
    remove,
    getEmail
}
