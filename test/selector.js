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
      })
      it('# returns null when not found', function() {
        expect(select('#does-not-exist').element).to.be.null
      })
      it('. returns an array of elements through getElementsByClassName', function() {
        expect(select('.class-A').element).to.be.an.instanceof(Array)
        expect(select('.class-A').element[1]).to.equal(document.getElementsByClassName('class-A')[1])
      })
      it('. returns null when not found', function() {
        expect(select('.does-not-exist').element).to.be.null
      })
      it('@ returns an array of elements through getElementsByName', function() {
        expect(select('@name-I').element).to.be.an.instanceof(Array)
        expect(select('@name-I').element[1]).to.equal(document.getElementsByName('name-I')[1])
      })
      it('@ returns null when not found', function() {
        expect(select('@does-not-exist').element).to.be.null
      })
      it('= returns an array of elements through getElementsByTagName', function() {
        expect(select('=div').element).to.be.an.instanceof(Array)
        expect(select('=div').element[1]).to.equal(document.getElementsByTagName('div')[1])
      })
      it('= returns null when not found', function() {
        expect(select('=does-not-exist').element).to.be.null
      })
      it('? returns an element through querySelector', function() {
        expect(select('?.class-A').element).to.equal(document.querySelector('.class-A'))
      })
      it('? returns null when not found', function() {
        expect(select('?.does-not-exist').element).to.be.null
      })
      it('* returns an array of elements through querySelectorAll', function() {
        expect(select('*.class-A').element).to.be.an.instanceof(Array)
        expect(select('*.class-A').element[1]).to.equal(document.querySelectorAll('.class-A')[1])
      })
      it('* returns null when not found', function() {
        expect(select('*.does-not-exist').element).to.be.null
      })

      it('returns elements scoped by a context', function() {
        var context = document.getElementById('id-2')

        expect(select('.class-A').element).to.have.length(3)
        expect(select('.class-A', context).element).to.have.length(2)
      })
    })
  })
})
