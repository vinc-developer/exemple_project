const log = require("../../../log/logger");
const database = require("../tools/database");
const User = require("../../models/Users");

const SELECT_BY_ID = `SELECT * FROM user WHERE id = ?`;
const SELECT_ALL = `SELECT * FROM user`;

async function getById(id) {
    let connexion = null;
    try{
        connexion = await database.getConnection();
        const [user] = await connexion.execute(SELECT_BY_ID, [id]);
        const userClass = new User(user.id, user.firstname, user.lastname, user.email, user.password, user.date_of_birthday);
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

}

async function updateUser(User) {

}

async function remove(id) {

}


module.exports = {
    getById,
    getAll,
    register,
    updateUser,
    remove
}
