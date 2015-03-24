System.import('selector').then(function(selector) {
  var expect = chai.expect,
    sandbox = document.getElementById('sandbox')

  describe('Selector', function() {
    before(function() {
      sandbox.innerHTML = '\
        <div id="id-1" class="class-A"></div>\
        <div id="id-2" name="name-I">\
          <span class="class-A"></span>\
          <span class="class-A" name="name-I"></span>\
        </div>\
      '
    })

    after(function() {
      while (sandbox.lastChild) {
        sandbox.removeChild(sandbox.lastChild)
      }
    })

    describe('#select()', function() {
      var select = selector.select

      it('returns the first element that matches the selector', function() {
        expect(select('#id-2 .class-A?').elements[0]).to.equal(document.querySelector('#id-2 .class-A'))
        expect(select('#id-2 .class-A?').length).to.equal(1)
        expect(select('[name="name-I"]?').elements[0]).to.equal(document.querySelector('[name="name-I"]'))
        expect(select('[name="name-I"]?').length).to.equal(1)
      })

      it('returns a collection of elements that match the selector', function() {
        expect(select('#id-2 span').elements[0]).to.equal(document.querySelectorAll('#id-2 span')[0])
        expect(select('#id-2 span').elements[1]).to.equal(document.querySelectorAll('#id-2 span')[1])
        expect(select('#id-2 span').elements).to.have.length(2)
        expect(select('#id-2 span').length).to.equal(2)

        expect(select('.class-A').elements[0]).to.equal(document.querySelectorAll('.class-A')[0])
        expect(select('.class-A').elements[1]).to.equal(document.querySelectorAll('.class-A')[1])
        expect(select('.class-A').elements[2]).to.equal(document.querySelectorAll('.class-A')[2])
        expect(select('.class-A').elements).to.have.length(3)
        expect(select('.class-A').length).to.equal(3)
      })

      it('returns null if there are no matches', function() {
        expect(select('.does-not-exist?').elements).to.be.null
        expect(select('.does-not-exist?').length).to.equal(0)

        expect(select('.does-not-exist').elements).to.be.null
        expect(select('.does-not-exist').length).to.equal(0)
      })

      it('returns elements scoped by context', function() {
        var context = document.getElementById('id-2')

        expect(select('.class-A').elements).to.have.length(3)
        expect(select('.class-A').length).to.equal(3)

        expect(select('.class-A', context).elements).to.have.length(2)
        expect(select('.class-A', context).length).to.equal(2)
      })
    })
  })
})
