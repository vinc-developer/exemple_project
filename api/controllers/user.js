const log = require("../log/logger");
const User = require("../services/models/Users");
const userDAO = require("../services/database/dao/user");
const addressDAO = require("../services/database/dao/address");
const { registerValidation, verifUpdatePassword, verifUpdateUser } = require("../config/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body.User;
    try{
        const userBack = await userDAO.getByEmail(email);
        if(!userBack){
            return res.status(403).send({ "Error": "Le mail n'existe pas." });
        }
        const validPassword = await bcrypt.compare(password, userBack.password);
        if(!validPassword){
            return res.status(401).send({ "Error": "Les mots de passe ne correspond pas !" });
        }

        const playoad = {id: userBack.id};
        const token = jwt.sign(playoad, process.env.TOKEN_SECRET, { expiresIn: 7200});
        let refreshToken = jwt.sign(playoad, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 7200});

        delete userBack.password;

        return res.status(200).send({"Message": "Connection réussie", "User": userBack, "idToken": token, "refreshToken": refreshToken});
    }catch (e) {
        log.error("Error in login controller : " + e);
    }
}

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
     const { firstname, lastname, email, password, confirmPassword, dateOfBirthday, address } = req.body.User;
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
    const checkEmail = await userDAO.getEmail(email);
    if(checkEmail){
        return res.status(403).send({error: "L'email existe deja."});
    }

     try{
         const salt = await bcrypt.genSalt(12);
         const hashedPassword = await bcrypt.hash(password, salt);
         const newAddress = await addressDAO.insert(address);
         const userClass = User.UserRegister(firstname, lastname, email, hashedPassword, dateOfBirthday, newAddress.id);
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
    const { id, lastname, firstname, email } = req.body.User;
    const { error } = verifUpdateUser(req.body.User);
    if (error) {
        return res.status(403).send({"Error": error.details[0].message});
    }
    const userBack = await userDAO.getById(id);

    if(email !== userBack.email){
        const checkEmail = await userDAO.getEmail(email);
        if(checkEmail){
           return res.status(403).send({error: "L'email existe deja."});
        }else{
            await userDAO.updateEmail(email, id);
        }
    }

    const userClass = User.UserUpdate(id, firstname, lastname, email);

    const user = await userDAO.updateUser(userClass);
    res.status(200).send({"User": user})

}

const updatePassword = async (req, res) => {
    const { id, password, confirmPassword } = req.body.User;
    const {error} = verifUpdatePassword(req.body.User);
    if (error) {
        return res.status(403).send({"Error": error.details[0].message});
    }
    if (password !== confirmPassword) {
        return res.status(403).send({"Error": "Mot de passe différent de la confirmation !"});
    }
    try{
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verif = await userDAO.updatePassword(id, hashedPassword);
        if(verif){
            res.status(200).send({"Message": "Mot de passe modifier"});
        }
    }catch (e) {
        log.error("Error userController updatePassword : " + e);
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const userBack = await userDAO.getById(id);
        await addressDAO.remove(userBack.address.id);
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
    updatePassword,
    login
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
