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
      ';
    })

    after(function() {
      while (sandbox.lastChild) {
        sandbox.removeChild(sandbox.lastChild)
      }
    })

    describe('#select()', function() {
      var select = selector.select

      it('# returns an element through getElementById', function() {
        expect(select('#id-1').element).to.equal(document.getElementById('id-1'))
        expect(select('#does-not-exist').element).to.equal(document.getElementById('does-not-exist'))
      })
      it('. returns elements through getElementsByClassName', function() {
        expect(select('.class-A').element).to.equal(document.getElementsByClassName('class-A'))
        expect(select('.does-not-exist').element).to.equal(document.getElementsByClassName('does-not-exist'))
      })
      it('@ returns elements through getElementsByName', function() {
        expect(select('@name-I').element).to.equal(document.getElementsByName('name-I'))
        expect(select('@does-not-exist').element).to.equal(document.getElementsByName('does-not-exist'))
      })
      it('= returns elements through getElementsByTagName', function() {
        expect(select('=div').element).to.equal(document.getElementsByTagName('div'))
        expect(select('=does-not-exist').element).to.equal(document.getElementsByTagName('does-not-exist'))
      })
      it('? returns an element through querySelector', function() {
        expect(select('?.class-A').element).to.equal(document.querySelector('.class-A'))
        expect(select('?.does-not-exist').element).to.equal(document.querySelector('.does-not-exist'))
      })
      it('* returns elements through querySelectorAll', function() {
        expect(select('*.class-A').element).to.be.deep.equal(document.querySelectorAll('.class-A'))
        expect(select('*.does-not-exist').element).to.be.deep.equal(document.querySelectorAll('.does-not-exist'))
      })

      it('returns elements scoped by a context', function() {
        var context = document.getElementById('id-2')

        expect(select('.class-A').element).to.have.length(3)
        expect(select('.class-A', context).element).to.have.length(2)
      })
    })
  })
})
