var whitelist = require("../models/user.js");

class ErrorEmailAlreadyExists extends Error {
    
    constructor() {
        
        super();
        this.name = 'Error: ya existe un usuario con el mismo email.';
        Error.captureStackTrace(this, this.constructor);
    }
}

class ErrorFieldIsEmpty extends Error {
    
    constructor(field) {
        
        super();
        this.name = 'Error: no se ha ingresado ' + field + '.';
        Error.captureStackTrace(this, this.constructor);
    }
}

class ErrorIdDoesNotExist extends Error {
    
    constructor(id) {
        
        super();
        this.name = "Error: la ID no existe.";
        Error.captureStackTrace(this, this.constructor);
    }
}

class BaseDeDatos {

    constructor(){
        this.userModel = whitelist;
    }

    async get_whitelist () {
        const users_structures = this.userModel.find({});
        return users_structures;
    }

    async get_user (email) {
        if (email == null || email === '') {
            console.log("Error: nombre vacío.");
            throw new ErrorFieldIsEmpty("nombre");
        }
        return this.NLUModel
                    .findOne({email:email})
                    .lean()
                    .then(result => {return result})
                    .catch(e => {throw e});
    }

    async user_email_exists(email) {

        return this.NLUModel
                    .findOne({ email: email })
                    .select("email")
                    .lean()
                    .then(result => {
                        console.log(result);
                        return result != null;
                    });
    }

    async add_user(name, surname, email) {
        if (name == null || name === '') {
            console.log("Error: nombre vacío.");
            throw new ErrorFieldIsEmpty("nombre");
        }

        if (surname == null || surname === '') {
            console.log("Error: apellido vacío.");
            throw new ErrorFieldIsEmpty("apellido");
        }

        if (email == null || email === '') {
            console.log("Error: email vacío.");
            throw new ErrorFieldIsEmpty("email");
        }
        
        if (await this.user_email_exists(email)){
            console.log("Error: " + email + " ya existe.");
            throw new ErrorEmailAlreadyExists();
        }
        
        console.log("Usuario nuevo, se agrega a la lista blanca.");
        const obj = JSON.stringify({name: name, surname: surname, email:email});
        const user_structure = new this.userModel(JSON.parse(obj));
        user_structure.save();
        return user_structure;

    }

    async edit_user(id, name, surname, email) {

        try {
            if (id == null || id === '') {
                console.log("Error: ID vacía.");
                throw new ErrorFieldIsEmpty("id");
            }
            
            if(name === '') {
                
                name = null;
            }
            
            if(surname === '') {
                
                surname = null;            
            }

            if(email === '') {
                
                email = null;            
            }
            
            let name_is_empty = (name === null);
            let surname_is_empty = (surname === null);
            let email_is_empty = (email === null);
            
            if (name_is_empty && surname_is_empty && email_is_empty) {
                console.log("Error: nombre, apellido y email vacíos.");
                throw new ErrorFieldIsEmpty("nombre, apellido y email");
            }
            
            let structure = await this.get_user(email);

            const obj = JSON.stringify({name: name, surname: surname, email: email});
            let user_structure = new this.userModel(JSON.parse(obj));

            await this.userModel.findByIdAndUpdate(id, JSON.parse(obj), {new: true},  function (err, user_structure) {
                
                if (err){
                    console.log("Error: " + err.toString());
                }
                else{
                    console.log("ID del usuario actualizado: ", id);
                }
            });

            return user_structure;
        } catch (e){
            if (e instanceof ErrorFieldIsEmpty || e instanceof ErrorEmailAlreadyExists) {
                throw e;
            }
            throw new ErrorEmailAlreadyExists(); // ?
        }
    }

    async delete_user(id) {

        if (id == null || id === '') {
            console.log("Error: ID vacía.");
            throw new ErrorFieldIsEmpty("id");
        }

        return this.userModel.findByIdAndDelete(id);
    }
}

module.exports = BaseDeDatos;
