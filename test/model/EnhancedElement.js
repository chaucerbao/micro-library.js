System.import('model/EnhancedElement').then(function(EnhancedElement) {
  var expect = chai.expect,
    sandbox = document.getElementById('sandbox')

  describe('EnhancedElement', function() {
    beforeEach(function() {
      sandbox.innerHTML = '\
        <input id="id-1" class="class-A class-Z" type="checkbox" checked />\
        <input id="id-2" class="class-A class-Z" type="checkbox" />\
      '
    })

    after(function() {
      while (sandbox.lastChild) {
        sandbox.removeChild(sandbox.lastChild)
      }
    })

    describe('#each()', function() {
      it('applies a callback to each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.element[0].hasProcessed).to.be.undefined
        expect(collection.element[1].hasProcessed).to.be.undefined
        collection.each(function(element) {
          element.hasProcessed = true
        })
        expect(collection.element[0].hasProcessed).to.be.true
        expect(collection.element[1].hasProcessed).to.be.true
      })

      it('is chainable', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))
        expect(collection).to.be.an.instanceof(EnhancedElement.default)
        expect(collection.each(function(element) {})).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#attr()', function() {
      it('returns an attribute\'s value from an element', function() {
        var single = new EnhancedElement.default(document.getElementById('id-1'))

        expect(single.attr('id')).to.equal('id-1')
      })
      it('returns an attribute\'s value from the first element of a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.attr('id')).to.equal('id-1')
      })
      it('sets an attribute on each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.element[0].getAttribute('id')).to.equal('id-1')
        expect(collection.element[1].getAttribute('id')).to.equal('id-2')
        collection.attr('id', 'new-id')
        expect(collection.element[0].getAttribute('id')).to.equal('new-id')
        expect(collection.element[1].getAttribute('id')).to.equal('new-id')
      })

      it('is chainable when setting an attribute', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))
        expect(collection).to.be.an.instanceof(EnhancedElement.default)
        expect(collection.attr('id', 'does-not-matter')).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#prop()', function() {
      it('returns a property\'s value from an element', function() {
        var single = new EnhancedElement.default(document.getElementById('id-1'))

        expect(single.prop('checked')).to.be.true
      })
      it('returns a property\'s value from the first element of a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.prop('checked')).to.be.true
      })
      it('sets a property on each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.element[0].checked).to.be.true
        expect(collection.element[1].checked).to.be.false
        collection.prop('checked', null)
        expect(collection.element[0].checked).to.be.false
        expect(collection.element[1].checked).to.be.false
      })

      it('is chainable when setting an property', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))
        expect(collection).to.be.an.instanceof(EnhancedElement.default)
        expect(collection.prop('checked', true)).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#addClass()', function() {
      it('adds space-separated classes to an element', function() {
        var single = new EnhancedElement.default(document.getElementById('id-1'))

        expect(single.element.classList.contains('class-B')).to.be.false
        expect(single.element.classList.contains('class-C')).to.be.false
        single.addClass('class-B class-C')
        expect(single.element.classList.contains('class-B')).to.be.true
        expect(single.element.classList.contains('class-C')).to.be.true
      })

      it('adds space-separated classes to each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

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

      it('is chainable', function() {
        var single = new EnhancedElement.default(document.getElementById('id-1'))
        expect(single).to.be.an.instanceof(EnhancedElement.default)
        expect(single.addClass('does-not-matter')).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#removeClass()', function() {
      it('removes space-separated classes from an element', function() {
        var single = new EnhancedElement.default(document.getElementById('id-1'))

        expect(single.element.classList.contains('class-A')).to.be.true
        expect(single.element.classList.contains('class-Z')).to.be.true
        single.removeClass('class-A class-Z')
        expect(single.element.classList.contains('class-A')).to.be.false
        expect(single.element.classList.contains('class-Z')).to.be.false
      })

      it('removes space-separated classes from each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

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

      it('is chainable', function() {
        var single = new EnhancedElement.default(document.getElementById('id-1'))
        expect(single).to.be.an.instanceof(EnhancedElement.default)
        expect(single.removeClass('does-not-matter')).to.be.an.instanceof(EnhancedElement.default)
      })
    })
  })
})
