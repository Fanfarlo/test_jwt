import express, {NextFunction, Request, Response} from 'express'
import {User, UserStore, TokenType} from '../models/user'
import jwt from 'jsonwebtoken'

const store = new UserStore

const create = async (req:Request, res:Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    }
    try{
        const newUser = await store.create(user)
        var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET||'');
        res.json(token)
    } catch(error){
        res.status(400)
        res.json(error)
    }
}


const authenticate = async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET||'');
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

  const update = async (req: Request, res: Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader||''.split(' ')[1]
        const jwtCons = jwt.verify(token, process.env.TOKEN_SECRET||'')
        const decoded = jwtCons as TokenType

        if(decoded.user.id !== user.id) {
            throw new Error('User id does not match!')
        }
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const updated = await store.create(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        res.json(`${err} + ${user}`)
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

const usersRoute = (app:express.Application) => {
    app.post('/users', verifyAuthToken, create)
}

export default usersRoute