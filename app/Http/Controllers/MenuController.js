'use strict'

const Database = use('Database')
const Menu = use('App/Model/Menu')

class MenuController {

  * index(request, response) {
    const menus = yield Menu.all()

    yield response.sendView('menu.index', {menus: menus.toJSON()});
  }

  * create(request, response) {
    var create = true;
    var res = {create: create};
    yield response.sendView('menu.form', {res});
  }

  * store(request, response) {
    const menu = yield Database.table('menu')
                  .insert({
                    kode_menu: request.input('kode_menu'),
                    name: request.input('name'),
                    price: request.input('price'),
                    created_by: '1',
                    updated_by: '1',
                  })
    if(menu){
      yield response.route('menu.index')
    } else {
      var res = {'success': false, 'result': 'Failed add data'}
      yield response.json(res)
    }
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    const id = request.param('id');
    const menu = yield Database.table('menu').where('kode_menu', id).first()
    var create = false;
    var res = {create: create};
    yield response.sendView('menu.form', {res, menu});
  }

  * update(request, response) {
    const kode_menu = request.param('id');
    const menu = yield Database.table('menu').where('kode_menu', kode_menu)
                  .update({
                    kode_menu: request.input('kode_menu'),
                    name: request.input('name'),
                    price: request.input('price'),
                    created_at: request.input('created_at'),
                    updated_at: request.input('updated_at'),
                  })
    if(menu){
      yield response.route('menu.index')
    } else {
      var res = {'success': false, 'result': 'Failed add data'}
      yield response.json(res)
    }
  }

  * destroy(request, response) {
    const kode_menu = request.param('id')
    const menu = yield Database.table('menu').where('kode_menu', kode_menu).del()
    yield response.route('menu.index')    
  }

}

module.exports = MenuController
