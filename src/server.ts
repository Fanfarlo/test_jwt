import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mythical_weapons_routes from './handlers/mythical_weapons'
import usersRoute from './handlers/users'


const app:express.Application= express()
const address:string = "0.0.0.0:3000"

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/', function(req:Request, res:Response){
    res.send('Hello World')
})

usersRoute(app)
mythical_weapons_routes(app)


app.listen(3000, function(){
    console.log(`starting app on: ${address}`)
})