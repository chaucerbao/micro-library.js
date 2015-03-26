System.import('ajax').then(function(ajax) {
  var expect = chai.expect,
    headers = {},
    xhr, requests

  describe('Ajax', function() {
    beforeEach(function() {
      requests = []
      xhr = sinon.useFakeXMLHttpRequest()

      xhr.onCreate = function(xhr) {
        requests.push(xhr)
      }
    })

    afterEach(function() {
      xhr.restore()
    })

    describe('#get()', function() {
      it('sends a GET request and returns a Promise', function(done) {
        var result = ajax.get('/some/url/', {
          a: 1,
          b: 2
        }).then(function(data) {
          expect(data.method).to.equal('GET')
          expect(data.url).to.equal('/some/url/?a=1&b=2')
          expect(data.requestBody).to.not.exist
          expect(data.responseText).to.equal('Response Text')
          done()
        })

        expect(result).to.be.an.instanceOf(Promise)

        requests[0].respond(200, headers, 'Response Text')
      })
    })

    describe('#post()', function() {
      it('sends a POST request and returns a Promise', function(done) {
        var result = ajax.post('/some/url/', {
          a: 1,
          b: 2
        }).then(function(data) {
          expect(data.method).to.equal('POST')
          expect(data.url).to.equal('/some/url/')
          expect(data.requestBody).to.be.an.instanceOf(FormData)
          expect(data.responseText).to.equal('Response Text')
          done()
        })

        expect(result).to.be.an.instanceOf(Promise)

        requests[0].respond(201, headers, 'Response Text')
      })
    })

    describe('#put()', function() {
      it('sends a PUT request and returns a Promise', function(done) {
        var result = ajax.put('/some/url/', {
          a: 1,
          b: 2
        }).then(function(data) {
          expect(data.method).to.equal('PUT')
          expect(data.url).to.equal('/some/url/')
          expect(data.requestBody).to.be.an.instanceOf(FormData)
          expect(data.responseText).to.equal('Response Text')
          done()
        })

        expect(result).to.be.an.instanceOf(Promise)

        requests[0].respond(200, headers, 'Response Text')
      })
    })

    describe('#del()', function() {
      it('sends a DELETE request and returns a Promise', function(done) {
        var result = ajax.del('/some/url/', {
          a: 1,
          b: 2
        }).then(function(data) {
          expect(data.method).to.equal('DELETE')
          expect(data.url).to.equal('/some/url/?a=1&b=2')
          expect(data.requestBody).to.not.exist
          expect(data.responseText).to.equal('Response Text')
          done()
        })

        expect(result).to.be.an.instanceOf(Promise)

        requests[0].respond(200, headers, 'Response Text')
      })
    })
  })
})
