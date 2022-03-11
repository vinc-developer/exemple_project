const joi = require("joi");

const registerValidation = (data) => {
    const schema = joi.object().keys({
        firstname: joi
            .string()
            .pattern(/^[-'a-zA-ZÀ-ÿ\s]{1,50}$/)
            .required()
            .messages({
                "string.pattern.base": `Le Prénom ne correspond pas au modèle demandé (max 50 caractères pouvant contenir : des lettres majuscules, des lettres minuscules, des apostrophes ou 1 espace ou un tiret)`,
            }),
        lastname: joi
            .string()
            .pattern(/^[-'a-zA-ZÀ-ÿ\s]{1,50}$/)
            .required()
            .messages({
                "string.pattern.base": `Le Nom ne correspond pas au modèle demandé (max 50 caractères pouvant contenir : des lettres majuscules, des lettres minuscules, des apostrophes ou 1 espace ou un tiret)`,
            }),
        email: joi.string().required().email(),
        password: joi
            .string()
            .pattern(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-!#$@%^&*()_+|~=`{}:;'<>?,.\\\[\]\/])(?=\S+$).{6,}$/
            )
            .required()
            .messages({
                "string.pattern.base": `Le mot de passe ne correspond pas au modèle demandé (minimum 6 caractères contenant au moins : 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial (@#$%^&-+=())`,
            }),
        confirmPassword:  joi
            .string()
            .pattern(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-!#$@%^&*()_+|~=`{}:;'<>?,.\\\[\]\/])(?=\S+$).{6,}$/
            )
            .required()
            .messages({
                "string.pattern.base": `Le mot de passe ne correspond pas au modèle demandé (minimum 6 caractères contenant au moins : 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial (@#$%^&-+=())`,
            }),
        dateOfBirthday: joi.date(),
        address: joi.any()
    });
    return schema.validate(data);
};

const verifUpdatePassword = (data) => {
    const schema = joi.object().keys({
        id: joi.number(),
        password: joi
            .string()
            .pattern(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-!#$@%^&*()_+|~=`{}:;'<>?,.\\\[\]\/])(?=\S+$).{6,}$/
            )
            .required()
            .messages({
                "string.pattern.base": `Le mot de passe ne correspond pas au modèle demandé (minimum 6 caractères contenant au moins : 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial (@#$%^&-+=())`,
            }),
        confirmPassword: joi
            .string()
            .pattern(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-!#$@%^&*()_+|~=`{}:;'<>?,.\\\[\]\/])(?=\S+$).{6,}$/
            )
            .required()
            .messages({
                "string.pattern.base": `Le mot de passe ne correspond pas au modèle demandé (minimum 6 caractères contenant au moins : 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial (@#$%^&-+=())`,
            }),
    });
    return schema.validate(data);
};

const verifUpdateUser = (data) => {
    const schema = joi.object().keys({
        id: joi.number(),
        lastname: joi
            .string()
            .pattern(/^[-'a-zA-ZÀ-ÿ\s]{1,50}$/)
            .required()
            .messages({
                "string.pattern.base": `Le Nom ne correspond pas au modèle demandé (max 50 caractères pouvant contenir : des lettres majuscules, des lettres minuscules, des apostrophes ou 1 espace ou un tiret)`,
            }),
        firstname: joi
            .string()
            .pattern(/^[-'a-zA-ZÀ-ÿ\s]{1,50}$/)
            .required()
            .messages({
                "string.pattern.base": `Le Prénom ne correspond pas au modèle demandé (max 50 caractères pouvant contenir : des lettres majuscules, des lettres minuscules, des apostrophes ou 1 espace ou un tiret)`,
            }),
        email: joi.string().required().email(),

    });
    return schema.validate(data);
}

module.exports = {
    registerValidation,
    verifUpdatePassword,
    verifUpdateUser
}
