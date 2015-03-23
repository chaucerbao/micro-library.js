System.import('model/EnhancedElement').then(function(EnhancedElement) {
  var expect = chai.expect,
    sandbox = document.getElementById('sandbox')

  describe('EnhancedElement', function() {
    beforeEach(function() {
      sandbox.innerHTML = '\
        <div id="id-1" class="class-A class-Z"></div>\
        <div id="id-2" class="class-A class-Z"></div>\
      ';
    })

    after(function() {
      while (sandbox.lastChild) {
        sandbox.removeChild(sandbox.lastChild)
      }
    })

    describe('#addClass()', function() {
      it('adds space-separated classes to an element', function() {
        var single = new EnhancedElement.default(document.getElementById('id-1'));

        expect(single.element.classList.contains('class-B')).to.be.false
        expect(single.element.classList.contains('class-C')).to.be.false
        single.addClass('class-B class-C')
        expect(single.element.classList.contains('class-B')).to.be.true
        expect(single.element.classList.contains('class-C')).to.be.true
      })

      it('adds space-separated classes to each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'));

        expect(collection.element[0].classList.contains('class-B')).to.be.false
        expect(collection.element[0].classList.contains('class-C')).to.be.false
        expect(collection.element[1].classList.contains('class-B')).to.be.false
        expect(collection.element[1].classList.contains('class-C')).to.be.false
        collection.addClass('class-B class-C')
        expect(collection.element[0].classList.contains('class-B')).to.be.true
        expect(collection.element[0].classList.contains('class-C')).to.be.true
        expect(collection.element[1].classList.contains('class-B')).to.be.true
        expect(collection.element[1].classList.contains('class-C')).to.be.true
      })
    })

    describe('#removeClass()', function() {
      it('removes space-separated classes from an element', function() {
        var single = new EnhancedElement.default(document.getElementById('id-1'));

        expect(single.element.classList.contains('class-A')).to.be.true
        expect(single.element.classList.contains('class-Z')).to.be.true
        single.removeClass('class-A class-Z')
        expect(single.element.classList.contains('class-A')).to.be.false
        expect(single.element.classList.contains('class-Z')).to.be.false
      })

      it('removes space-separated classes from each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'));

        expect(collection.element[0].classList.contains('class-A')).to.be.true
        expect(collection.element[0].classList.contains('class-Z')).to.be.true
        expect(collection.element[1].classList.contains('class-A')).to.be.true
        expect(collection.element[1].classList.contains('class-Z')).to.be.true
        collection.removeClass('class-A class-Z')
        expect(collection.element[0].classList.contains('class-A')).to.be.false
        expect(collection.element[0].classList.contains('class-Z')).to.be.false
        expect(collection.element[1].classList.contains('class-A')).to.be.false
        expect(collection.element[1].classList.contains('class-Z')).to.be.false
      })
    })
  })
})
