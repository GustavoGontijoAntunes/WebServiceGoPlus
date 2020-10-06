
const mysqlServer = require ('mysql')

const connection = mysqlServer.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test' 
})

const usuarios = new Promise( (resolve, reject) => {
	connection.query('Select * From usuario', (error, results) =>{
		if(error){
			reject(error)
		}
		resolve ({ usuarios: results })
	})
})

module.exports = usuarios