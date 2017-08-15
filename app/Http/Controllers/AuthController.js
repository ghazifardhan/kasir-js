'use strict'

class AuthController {

    constructor (request, response) {
        const isLogged = request.auth.check();
        if(isLogged){
            return
        }

        response.ok("You must logged in");
    }

}

module.exports = AuthController
