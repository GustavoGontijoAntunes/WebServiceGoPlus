
const sha1 = require('sha1')

const usuarios = deps => {
	return {
		user: (id) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps

				connection.query('SELECT * FROM Usuario WHERE Id = ?', [id], (error, results) => {
					if(error){
						errorHandler(error, 'Falha ao listar os usuários', reject)
						return false
					}
					resolve ({ usuario: results })
				})
			})
		},
		all: () => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps

				connection.query('SELECT * FROM Usuario', (error, results) => {
					if(error){
						errorHandler(error, 'Falha ao listar os usuários', reject)
						return false
					}
					resolve ({ usuario: results })
				})
			})
		},
		save: (email, password) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps

				connection.query('INSERT INTO usuario (email, password) VALUES (?, ?)', [email, sha1(password)], (error, results) => {
					if(error){
						errorHandler(error, `Falha ao salvar o usuário ${email}`, reject)
						return false
					}
					resolve ({ usuario: { email, id: results.insertId } })
				})
			})
		},
		update: (id, password) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps

				connection.query('UPDATE usuario SET password = ? WHERE id = ? ', [sha1(password), id], (error, results) => {
					if(error || !results.affectedRows){
						errorHandler(error, `Falha ao atualizar a senha do usuário de id ${id}`, reject)
						return false
					}
					resolve ({ usuario: { id }, affectedRows: results.affectedRows })
				})
			})
		},
		del: (id) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps

				connection.query('DELETE FROM usuario WHERE id = ? ', [id], (error, results) => {
					if(error || !results.affectedRows){
						errorHandler(error, `Falha ao remover o usuário de id ${id}`, reject)
						return false
					}
					resolve ({ message: 'Usuário removido com sucesso!', affectedRows: results.affectedRows })
				})
			})
		}
	}
}

module.exports = usuarios