import {WeaponStore, Weapon }from '../models/mythical_weapons'

const store = new WeaponStore

describe('Mythical Weapon Model', () =>{
    it('should have an index method', () => {
        expect(store.index).toBeDefined()
    })
})