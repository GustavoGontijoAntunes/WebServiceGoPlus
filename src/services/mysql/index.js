
const mysqlServer = require ('mysql')

const connection = mysqlServer.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
})

const errorHandler = (error, msg, rejectFunction) => {
	console.error(error)
	rejectFunction({ error: msg })
}

const categoriaModule = require('./categorias')({ connection, errorHandler })
const usuarioModule = require('./usuarios')({ connection, errorHandler })
const authModule = require('./auth')({ connection, errorHandler })

module.exports = {
	categorias: () => categoriaModule,
	usuarios: () => usuarioModule,
	auth: () => authModule
}