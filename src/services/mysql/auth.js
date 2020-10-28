
const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = deps => {
	return {
		authenticate: (email, password) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps
				const queryString = 'SELECT Id, Email FROM Usuario WHERE Email = ? AND Senha = ?'
				const queryData = [email, sha1(password)]

				connection.query(queryString, queryData, (error, results) => {
					console.log(error)
					console.log(results)
					if(error || !results.length){
						errorHandler(error, 'Falha ao localizar o usuário', reject)
						return false
					}

					const { email, Id } = results[0]

					const token = jwt.sign({ email, Id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

					console.log(token)

					resolve ({ token, Id  })
				})
			})
		},

		registrar: (Nome, Sobrenome, Email, Senha, Cidade, Telefone) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps
				const queryString = 'Insert into Usuario(Nome, Sobrenome, Email, Senha, Cidade, Telefone)' +
									'Values (?, ?, ?, ?, ?, ?);'
				const queryData = [Nome, Sobrenome, Email, sha1(Senha), Cidade, Telefone]

				connection.query(queryString, queryData, (error, results) => {
					if(error){
						errorHandler(error, 'Falha ao registrar o usuário.', reject)
						return false
					}

					const id = results.insertId

					const token = jwt.sign({ Email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

					console.log(token)

					resolve ({ token })
				})
			})
		},
	}
}

module.exports = auth