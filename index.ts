import express, { Request, Response, NextFunction } from 'express'
import { userRouter } from './users/users.js'

const port = 8000
const app = express()

// app.all('/hello', (req, res, next) => {
// 	console.log('All!')
// 	next()
// })

// const cb = (req, res, next) => {
// 	console.log('CB')
// 	next()
// }

app.use((req, res, next) => {
	console.log('Time ', Date.now())
	next()
})

app.use('/users', userRouter)

app.get('/hello', (req, res) => {
	throw new Error('Error!!!')
	// res.status(203).json({
	// 	success: true,
	// 	message: 'hello',
	// })
	//
	// res.links({
	// 	next: 'index.js',
	// })
	//
	// res.send('hello')
	//
	// res.download('../../../Downloads/Telegram Desktop/02_ART.jpg', 'Beautiful pic')
})

// app
// 	.route('/user')
// 	.get('/hello', (req, res) => {
// 		res.send('Hi!')
// 	})
// 	.post('/hello', cb, (req, res) => {
// 		res.send('Hi!')
// 	})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err.message)
	res.status(500).send(err.message)
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
