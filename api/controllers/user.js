const log = require("../log/logger");
const User = require("../services/models/Users");
const userDAO = require("../services/database/dao/user");
const { registerValidation } = require("../config/validation");

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
     const { firstname, lastname, email, password, confirmPassword, dateOfBirthday } = req.body.User;
     const { error } = registerValidation(req.body.User);

     if (error) {
        return res.status(403).send({"Error": error.details[0].message});
     }
     if (password !== confirmPassword) {
         return res.status(403).send({"Error": "Mot de passe différent de la confirmation !"});
     }
    if(compareDate(dateOfBirthday)){
        return res.status(403).send({error: "Vous ne pouvez pas utilisez l'application car vous êtes mineur."});
    }
    const checkEmail = userDAO.getEmail(email);
    if(checkEmail){
        return res.status(403).send({error: "L'email existe deja."});
    }

     try{
         const salt = await bcrypt.genSalt(12);
         const hashedPassword = await bcrypt.hash(password, salt);
         const userClass = User.UserRegister(firstname, lastname, email, password, dateOfBirthday);
         const user = await userDAO.register(userClass);
         // creer le token

         // envoyer un mail

         delete user.password;
         return res.status(200).send({"User": user});
     } catch (e) {
         log.error("Error userController register : " + e);
     }
}

const updateUser = async (req, res) => {

}

const updatePassword = async (req, res) => {

}

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await userDAO.remove(id);
        const user = await userDAO.getById(id);
        user.length > 0 ?
            res.status(403).send({"Error": "L'utilisateur n'a pas été supprimé !"}) :
            res.status(200).send({"Message": "L'utilisateur a bien été supprimé !"});
    } catch (e) {
        log.error("Error in remove controller : " + e);
    }
}


module.exports = {
    getById,
    getAll,
    register,
    updateUser,
    remove,
    updatePassword
}

function compareDate(dateOfBirthday){
    let dateBirthday = new Date(dateOfBirthday);
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();
    let yearsBack18= new Date(year - 18, month, day);
    if(yearsBack18 < dateBirthday ){
        return true;
    }
}
