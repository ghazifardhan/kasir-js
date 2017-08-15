'use strict'

class UserController {

    * login_page (request, response){

        const isLogged = yield request.auth.check()

        if(isLogged){
            yield response.sendView('menu')
        } else {
            yield response.sendView('auth.login')
        }
    }

    * login (request, response){

        const email = request.input('email')
        const password = request.input('password')
        const login = yield request.auth.attempt(email, password)

        if(login){
            yield response.route('home')
        } else {
            yield response.unauthorized('Invalid credentials')
        }
    }
    
    * logout (request, response){
        const isLogout = yield request.auth.logout()
        if(isLogout){
            yield response.sendView('auth.login')
        }
    }

}

module.exports = UserController
