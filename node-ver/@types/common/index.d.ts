interface Sequrity  { 
  dataMode: string
}
interface DbConnection {
  host: string
  user: string
  password: string
  database: string
}

interface requestItemParams {
  store?: string
  from?: string
  to?: string
  category?: string
  title?: string
  sort?: string
  page?: string
  page_size?: string
}