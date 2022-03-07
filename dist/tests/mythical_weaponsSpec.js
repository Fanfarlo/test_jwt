"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythical_weapons_1 = require("../models/mythical_weapons");
const store = new mythical_weapons_1.WeaponStore;
describe('Mythical Weapon Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
});
