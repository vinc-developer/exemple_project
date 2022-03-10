module.exports = class User{
    constructor(id, firstname, lastname, email, password, dateOfBirthday, dateCreated) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.dateOfBirthday = dateOfBirthday;
        this.dateCreated = dateCreated;
    };

    static UserRegister(firstname, lastname, email, password, dateOfBirthday){
        return new User(null, firstname, lastname, email, password, dateOfBirthday, null);
    };
}
