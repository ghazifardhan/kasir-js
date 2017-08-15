'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
const Database = use('Database')

Route.group('auth-routes', () => {

    Route.resource('menu', 'MenuController')
    
}).middleware('auth')

Route.get('/', 'UserController.login_page')

Route.get('home', function* (request, response){
    yield response.sendView('home')
}).as('home')

Route.post('login', 'UserController.login')
Route.get('logout', 'UserController.logout').as('logout')

Route.get('check_kode_menu', function* (request, response){
    const id = request.input('kode_menu')
    const menu = yield Database.table('menu').where('kode_menu', id).first()
    if(!menu){
        var res = {
            'success': true,
            'result': 'Kode Menu tersedia'
        }
        yield response.json(res)
    } else {
        var res = {
            'success': false,
            'result': 'Kode Menu sudah ada'
        }
        yield response.json(res)
    }
    
}).as('check_kode_menu')

