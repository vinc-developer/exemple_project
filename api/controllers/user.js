const log = require("../log/logger");
const User = require("../services/models/Users");
const userDAO = require("../services/database/dao/user");

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const userClass = await userDAO.getById(id);
        res.status(200).send({"User": userClass});
    } catch (e) {
        log.error("Error in getById controller : " + e);
    }
}

const getAll = async (req, res) => {
    try {
        const allUsers = await userDAO.getAll();
        res.status(200).send({"Users": allUsers});
    } catch(e){
        log.error("Error in getALL controller : " + e);
    }
}

const register = async (req, res) => {

}

const updateUser = async (req, res) => {

}

const remove = async (req, res) => {

}


module.exports = {
    getById,
    getAll,
    register,
    updateUser,
    remove
}
