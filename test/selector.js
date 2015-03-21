System.import('selector').then(function(selector) {
  var expect = chai.expect,
    sandbox = document.getElementById('sandbox')

  describe('Selector', function() {
    before(function() {
      sandbox.innerHTML = '\
        <div id="id-1" class="class-A"></div>\
        <div id="id-2" name="name-I">\
          <span id="id-3" class="class-A"></span>\
          <span id="id-4" class="class-A" name="name-I"></span>\
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
        expect(select('#id-1')).to.equal(document.getElementById('id-1'))
        expect(select('#id-2')).to.equal(document.getElementById('id-2'))
      })
      it('. returns elements through getElementsByClassName', function() {
        expect(select('.class-A')).to.equal(document.getElementsByClassName('class-A'))
        expect(select('.class-B')).to.equal(document.getElementsByClassName('class-B'))
      })
      it('@ returns elements through getElementsByName', function() {
        expect(select('@name-I')).to.equal(document.getElementsByName('name-I'))
        expect(select('@name-II')).to.equal(document.getElementsByName('name-II'))
      })
      it('= returns elements through getElementsByTagName', function() {
        expect(select('=div')).to.equal(document.getElementsByTagName('div'))
        expect(select('=span')).to.equal(document.getElementsByTagName('span'))
      })
      it('? returns an element through querySelector', function() {
        expect(select('?.class-A')).to.equal(document.querySelector('.class-A'))
        expect(select('?.class-B')).to.equal(document.querySelector('.class-B'))
      })
      it('* returns elements through querySelectorAll', function() {
        expect(select('*.class-A')).to.be.deep.equal(document.querySelectorAll('.class-A'))
        expect(select('*.class-B')).to.be.deep.equal(document.querySelectorAll('.class-B'))
      })

      it('returns elements scoped by a context', function() {
        var context = document.getElementById('id-2')

        expect(select('.class-A')).to.have.length(3)
        expect(select('.class-A', context)).to.have.length(2)
      })
    })
  })
})
