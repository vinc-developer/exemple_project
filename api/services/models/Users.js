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

    static UserUpdate(id, firstname, lastname, email){
        return new User(id, firstname, lastname, email, null, null, null, null);
    }
}
