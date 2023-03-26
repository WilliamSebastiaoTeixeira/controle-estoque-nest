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