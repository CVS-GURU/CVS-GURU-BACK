const dev:Sequrity = { 
  dataMode: 'dev-mode'
}

const dbConnection:DbConnection = {
  host: 'localhost',
  user: 'cvs_user',
  password: 'Cvs1234!@#$',
  database: 'cvsguru'
}

export default {
  dataMode: dev.dataMode,
  dbConnection
};