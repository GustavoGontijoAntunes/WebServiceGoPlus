
const usuarios = require('../services/mysql')

const routes = (server) => {

	server.get('/usuarios', (req, res, next) => {
		usuarios.then(usuarios => console.log(usuarios))

		res.send(['1', 'lalala'])
		next()
	})

	server.post('/usuarios', (req, res, next) => {
		const { name } = req.params
		res.send(name)
		next()
	})

	/*
	server.put('/usuarios', (req, res, next) => {
		res.send()
		next()

	})

	server.delete('/usuarios', (req, res, next) => {
		res.send()
		next()

	})
	*/
	server.get('/', (req, res, next) => {
		res.send('Enjoy the silence!')
		next()
	})
}


module.exports = routes