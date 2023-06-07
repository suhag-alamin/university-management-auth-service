import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())

// parser

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

// application routes
app.use('/api/v1/users/', UserRoutes)

// testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Hello World!')
//   // throw new apiError(400, 'halar error')
//   // next('halar error')
//   throw new Error('error')
// })

// global error handler
app.use(globalErrorHandler)

export default app
