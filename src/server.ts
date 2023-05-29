import mongoose from 'mongoose'
import app from './app'
import config from './config'

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database connected')
    app.listen(config.port, () => {
      console.log(`University management app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connecte', err)
  }
}
main()
