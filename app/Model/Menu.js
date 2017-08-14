'use strict'

const Lucid = use('Lucid')

class Menu extends Lucid {

    static get table () {
        return 'menu'
    }
    
    static get incrementing () {
        return false
    }

    static get primaryKey () {
        return 'kode_menu'
    }
}

module.exports = Menu
