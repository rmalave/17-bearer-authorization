require('dotenv').config();

describe('.env file', () => {
  it('should be able to access each property', () => {
    expect(process.env.PORT).toEqual('3000');
    expect(process.env.APP_SECRET).toEqual('moon');
    expect(process.env.MONGODB_URI).toEqual('mongodb://localhost/test');
  });
});
