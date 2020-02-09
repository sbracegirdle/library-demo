import 'mocha';
import {expect} from 'chai';
import request from 'supertest';
import Server from '../server';

describe('book router integration test', () => {
  it('should get all books', () =>
    request(Server)
      .get('/api/v1/book')
      .expect('Content-Type', /json/)
      .then(r => {
        console.log(r.body);
        expect(r.body)
          .to.be.an('array')
          .of.length(0);
      }));

  it('should add a new book', () =>
    request(Server)
      .post('/api/v1/book')
      .send({title: 'My New Book', author: 'Miss Peach', synopsis: 'An autobiography', isbn: 12345778111, year: 2020})
      .expect('Content-Type', /json/)
      .then(r => {
        console.log(r.body);
        expect(r.body)
          .to.be.an('object')
          .that.has.property('title')
          .equal('My New Book');
      }));

  it('should delete a book by isbn', () =>
    request(Server)
      .delete('/api/v1/book/12345778111')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('success')
          .equal(true);
      }));
});
