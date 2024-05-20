import sql from 'mssql'
import config from '../config'

const stringConnection = {
    user : config.user,
    password : config.password,
    server : config.server,
    database : config.database,
    options: {
        trustServerCertificate: true
    }
}

export async function getConnection (){

    try {

        const conex = await sql.connect(stringConnection)
        return conex

    } catch (error){
        console.log (error)
    }
}

