module.exports = class User{
    constructor(id, firstname, lastname, email, password, dateOfBirthday, address, dateCreated) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.dateOfBirthday = dateOfBirthday;
        this.address = address;
        this.dateCreated = dateCreated;
    };

    static UserRegister(firstname, lastname, email, password, dateOfBirthday, address){
        return new User(null, firstname, lastname, email, password, dateOfBirthday, address, null);
    };
}
