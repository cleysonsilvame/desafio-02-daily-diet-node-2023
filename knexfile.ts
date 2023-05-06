import { config } from './src/database'

const knexConfig = {
  ...config,
  connection: String(config.connection).replace("db", "localhost")
}

export default knexConfig