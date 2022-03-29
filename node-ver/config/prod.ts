const prod:Sequrity = { 
  dataMode: 'prod-mode'
}

const dbConnection:DbConnection = {
  host: '221.133.61.193',
  user: 'dev',
  password: 'Mysql1234%',
  database: 'cvsguru'
}

export default {
  dataMode: prod.dataMode,
  dbConnection
};