//Supertest
const request = require('supertest')
//Server
const app = require('../server')


//Post request
describe('POST /client', () => {
     //Register
     it('Respond with status 400 when not sending data', (done => {
          request(app)
          .post('/client/register')
          .set('Accept', 'application/json')
          .expect({ message: 'Complete todos los campos', error: true })
          .expect(400)
          .then(err => {if(err) return done(err) 
               done()}).catch(done())
     })
)});