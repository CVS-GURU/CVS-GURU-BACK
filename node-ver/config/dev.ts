const dev:Sequrity = { 
  dataMode: 'dev-mode'
}

const dbConnection:DbConnection = {
  host: '10.1.193.1',
  user: 'dev',
  password: 'Mysql1234%',
  database: 'cvsguru'
}

export default {
  dataMode: dev.dataMode,
  dbConnection
};