
const db = require('../services/mysql')

const routes = (server) => {

	server.post('/autenticacao', async (req, res, next) => {
		try{
			const { email, password } = req.params
			res.send(await db.auth().authenticate(email, password))
		} catch(error){
			res.send(error)
		}
		next()
	})

	server.post('/registro', async (req, res, next) => {
		const { Nome, Sobrenome, Email, Senha, Cidade, Telefone } = req.params
		try{
			res.send(await db.auth().registrar(Nome, Sobrenome, Email, Senha, Cidade, Telefone))
		} catch(error){
			res.send(error)	
		}
		next()
	})

	server.post('/dadosusuario', async (req, res, next) => {
		const { id } = req.params
		try{
			res.send(await db.usuarios().user(id))
		} catch(error){
			res.send(error)
		}
		next()
	})

	server.get('/usuario', async (req, res, next) => {
		try{
			res.send(await db.usuarios().all())
		} catch(error){
			res.send(error)
		}
		next()
	})

	server.post('/usuario', async (req, res, next) => {
		const { name } = req.params
		try{
			res.send(await db.usuarios().save(name))
		} catch(error){
			res.send(error)	
		}
		next()
	})

	server.put('/usuario', async (req, res, next) => {
		const { id, name } = req.params
		try{
			res.send(await db.usuarios().update(id, name))
		} catch(error){
			res.send(error)
		}
		next()
	})
	
	server.del('/usuario', async (req, res, next) => {
		const { id } = req.params
		try{
			res.send(await db.usuarios().del(id))
		} catch(error){
			res.send(error)
		}
		next()
	})

	server.get('/categorias', async (req, res, next) => {
		try{
			res.send(await db.categorias().all())
		} catch(error){
			res.send(error)
		}
		next()
	})

	server.post('/categorias', async (req, res, next) => {
		const { name } = req.params
		try{
			res.send(await db.categorias().save(name))
		} catch(error){
			res.send(error)	
		}
		next()
	})

	server.put('/categorias', async (req, res, next) => {
		const { id, name } = req.params
		try{
			res.send(await db.categorias().update(id, name))
		} catch(error){
			res.send(error)
		}
		next()
	})
	
	server.del('/categorias', async (req, res, next) => {
		const { id } = req.params
		try{
			res.send(await db.categorias().del(id))
		} catch(error){
			res.send(error)
		}
		next()
	})
	
	server.get('/', (req, res, next) => {
		res.send('Enjoy the silence!')
		next()
	})
}


module.exports = routes