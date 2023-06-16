import dotenv from 'dotenv'
import Sequelize from 'sequelize'
dotenv.config()

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error)
  })
