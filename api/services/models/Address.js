module.exports = class Address{
    constructor(id, number, street, additionalAddress, zipCode, city, country) {
        this.id = id;
        this.number = number;
        this.street = street;
        this.additionalAddress = additionalAddress;
        this.zipCode = zipCode;
        this.city = city;
        this.country = country;
    }

    static AddressRegister(number, street, additionalAddress, zipCode, city, country){
        return new Address(null, number, street, additionalAddress, zipCode, city, country);
    }
}

