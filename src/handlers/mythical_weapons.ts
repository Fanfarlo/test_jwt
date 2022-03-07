import express, {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {Weapon, WeaponStore} from '../models/mythical_weapons'

const store = new WeaponStore()

//expres handler function
const index = async (_req: Request, res: Response) =>{
    const weapons = await store.index()
    res.json(weapons)
}
const destroy = async (req: Request, res: Response) => {
    const weapons:Weapon = await store.delete(req.body.id)
    res.json(weapons)
}

const update = async  (req: Request, res: Response) => {
    try {
        const weapons:Weapon = {
        name: req.body.name,
        quantity: req.body.quantity,
        bullets: req.body.bullets,
        id: req.body.id
    }
    const updated = await store.update(weapons)
    res.json(updated)
    } catch (err) {
        res.status(400)
        res.json(err)
    }  
}

const search = async (req: Request, res: Response) => {
    const weapons = await store.show(req.body.id)
    res.json (weapons)
}

const create = async (req: Request, res:Response) => {
    const weapons:Weapon = {
        name: req.body.name,
        quantity: req.body.quantity,
        bullets: req.body.bullets,
        }

        try {
            jwt.verify(req.body.token, process.env.TOKEN_SECRET||"")
        } catch (error) {
            res.status(401)
            res.json('')
        }
        // //verifica que el token sea verdadero
        // try{
        //     const authorizationHeader = _req.headers.authorization
        //     const token = authorizationHeader.split(' ')[1]
        //     jwt.verify(_req.body.token, process.env.TOKEN_SECRET||'')
        // }catch (err){
        //     res.status(401)
        //     res.json('Invalid token')
        //     return
        // }
    try {
    const newWeapon = await store.create(weapons)
    res.json(newWeapon)
        }
    catch (error) {
        res.status(400)
        res.json(error)
    }
 
}
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) =>{
    try {
        const authorizationHeader = req.headers.authorization||''
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET||'')
        next()
    } catch (error) {
        res.status(401)
    }
}
const mythical_weapons_routes = (app: express.Application) => {
    app.get('/mythical_weapons', verifyAuthToken, index)
    app.post('/mythical_weapons/', create)
    app.get('/mythical_weapons/:id', verifyAuthToken, search)
    app.patch('/mythical_weapons/',  verifyAuthToken, update)
    app.delete('/mythical_weapons/:id', verifyAuthToken, destroy) 
}

export default mythical_weapons_routes