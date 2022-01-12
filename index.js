import express from 'express'

const port = 8000
const app = express()

app.all('/hello', (req, res, next) => {
	console.log('All!')
	next()
})

const cb = (req, res, next) => {
	console.log('CB')
	next()
}

app.get('/hello', cb, (req, res) => {
	res.send('Hi!')
})

app
	.route('/user')
	.get('/hello', (req, res) => {
		res.send('Hi!')
	})
	.post('/hello', (req, res) => {
		res.send('Hi!')
	})

app.listen(port, () => {
	console.log(`Server started at http://localhost/${port}`)
})

// const server = http.createServer((req, res) => {
// 	res.statusCode = 200
// 	res.setHeader('Content-Type', 'text-plain')
// 	res.end('Hi!')
// })

// server.listen(port, host, () => console.log(`Server started at http://${host}:${port}`))
