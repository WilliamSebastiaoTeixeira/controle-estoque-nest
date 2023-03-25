export const jwtConstants = {
  secret: 'secretKey',
}; 

export const mongoose = {
  url: 'mongodb://********/controleEstoque',
  connectionOptions: {
    user: '****',
    pass: '****',
    authSource: 'admin',
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};

export const environment = 'development'; 

export const url = {
  clientBaseUrl: 'http://localhost:4040/#',
  apiBaseUrl: 'http://localhost:3000/api'
}; 
