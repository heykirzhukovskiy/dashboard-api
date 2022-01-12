import express from 'express'

const port = 8000
const app = express()

app.get('/hello', (req, res) => {
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
