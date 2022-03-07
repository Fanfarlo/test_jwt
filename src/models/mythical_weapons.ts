import client from '../database'

export type Weapon = {
    id?: number,
    name: string,
    quantity: number,
    bullets: boolean,
}

export class WeaponStore {
    async index():Promise<Weapon[]>{

        try {
            var conn = await client.connect()
            const sql = 'SELECT* FROM mythical_weapons'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot get weapons ${error}`)
        }
    }

    async create(b:Weapon):Promise<Weapon>{
        try {
            const conn = await client.connect()
            const sql = "INSERT INTO mythical_weapons (name, quantity, bullets) VALUES ($1, $2, $3) RETURNING *"
            const resolve = await conn.query(sql, [b.name, b.quantity, b.bullets])
            conn.release()
            return resolve.rows[0]
        
        } catch (error) {
            throw new Error (`Cannot create weapons ${error}`)
        }
    }

    async delete(id:number):Promise<Weapon>{
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM mythical_weapons WHERE id=($1)'
            const resolve = await conn.query(sql,[id])
            conn.release()
            return resolve.rows[0]
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }

    async show(id:number):Promise<Weapon>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT* FROM mythical_weapons WHERE id=($1)'
            const resolve = await conn.query(sql,[id])
            conn.release()
            return resolve.rows[0]
            
        } catch (error) {
            throw new Error (`Cannot show weapon ${error}`)
        }
    }

    async update(b:Weapon):Promise<Weapon>{
        try {
            const conn = await client.connect()
            const sql ="UPDATE mythical_weapons SET name=($1),quantity=($2),bullets=($3) WHERE id=($4) RETURNING *;";
            const resolve = await conn.query(sql, [b.name, b.quantity, b.bullets,b.id])
            conn.release()
            return resolve.rows[0]
        } catch (error) {
            throw new Error (`Cannot edit weapon ${error}`)
        }
    }
}