System.import('model/EnhancedElement').then(function(EnhancedElement) {
  var expect = chai.expect,
    sandbox = document.getElementById('sandbox')

  describe('EnhancedElement', function() {
    beforeEach(function() {
      sandbox.innerHTML = '\
        <div id="container-1" class="container">\
          <input id="id-1" class="class-A class-Z" type="checkbox" checked />\
          <input id="id-2" class="class-A class-Y class-Z" type="checkbox" />\
        </div>\
        <div class="container">\
          Plain text\
          <p>Paragraph <span>Nested Tag</span></p>\
        </div>\
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

        expect(collection.elements[0].hasProcessed).to.be.undefined
        expect(collection.elements[1].hasProcessed).to.be.undefined
        collection.each(function(element) {
          element.hasProcessed = true
        })
        expect(collection.elements[0].hasProcessed).to.be.true
        expect(collection.elements[1].hasProcessed).to.be.true
      })

      it('is chainable', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))
        expect(collection).to.be.an.instanceof(EnhancedElement.default)
        expect(collection.each(function(element) {})).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#attr()', function() {
      it('returns an attribute\'s value from the first element of a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.attr('id')).to.equal('id-1')
      })
      it('sets an attribute on each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.elements[0].getAttribute('id')).to.equal('id-1')
        expect(collection.elements[1].getAttribute('id')).to.equal('id-2')
        collection.attr('id', 'new-id')
        expect(collection.elements[0].getAttribute('id')).to.equal('new-id')
        expect(collection.elements[1].getAttribute('id')).to.equal('new-id')
      })

      it('is chainable when setting an attribute', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection).to.be.an.instanceof(EnhancedElement.default)
        expect(collection.attr('id', 'does-not-matter')).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#prop()', function() {
      it('returns a property\'s value from the first element of a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.prop('checked')).to.be.true
      })
      it('sets a property on each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.elements[0].checked).to.be.true
        expect(collection.elements[1].checked).to.be.false
        collection.prop('checked', null)
        expect(collection.elements[0].checked).to.be.false
        expect(collection.elements[1].checked).to.be.false
      })

      it('is chainable when setting an property', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection).to.be.an.instanceof(EnhancedElement.default)
        expect(collection.prop('checked', true)).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#addClass()', function() {
      it('adds space-separated classes to each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.elements[0].classList.contains('class-B')).to.be.false
        expect(collection.elements[0].classList.contains('class-C')).to.be.false
        expect(collection.elements[1].classList.contains('class-B')).to.be.false
        expect(collection.elements[1].classList.contains('class-C')).to.be.false
        collection.addClass('class-B class-C')
        expect(collection.elements[0].classList.contains('class-B')).to.be.true
        expect(collection.elements[0].classList.contains('class-C')).to.be.true
        expect(collection.elements[1].classList.contains('class-B')).to.be.true
        expect(collection.elements[1].classList.contains('class-C')).to.be.true
      })

      it('is chainable', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection).to.be.an.instanceof(EnhancedElement.default)
        expect(collection.addClass('does-not-matter')).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#removeClass()', function() {
      it('removes space-separated classes from each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.elements[0].classList.contains('class-A')).to.be.true
        expect(collection.elements[0].classList.contains('class-Z')).to.be.true
        expect(collection.elements[1].classList.contains('class-A')).to.be.true
        expect(collection.elements[1].classList.contains('class-Z')).to.be.true
        collection.removeClass('class-A class-Z')
        expect(collection.elements[0].classList.contains('class-A')).to.be.false
        expect(collection.elements[0].classList.contains('class-Z')).to.be.false
        expect(collection.elements[1].classList.contains('class-A')).to.be.false
        expect(collection.elements[1].classList.contains('class-Z')).to.be.false
      })

      it('is chainable', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection).to.be.an.instanceof(EnhancedElement.default)
        expect(collection.removeClass('does-not-matter')).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#hasClass()', function() {
      it('determines the presence of a class on the first element of a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(collection.hasClass('class-Z')).to.be.true
        expect(collection.hasClass('class-Y')).to.be.false
      })
    })

    describe('#empty()', function() {
      it('removes all child nodes from each element in a collection', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('container'))

        expect(collection.elements[0].hasChildNodes()).to.be.true
        expect(collection.elements[1].hasChildNodes()).to.be.true
        collection.empty()
        expect(collection.elements[0].hasChildNodes()).to.be.false
        expect(collection.elements[1].hasChildNodes()).to.be.false
      })

      it('is chainable', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('container'))

        expect(collection).to.be.an.instanceof(EnhancedElement.default)
        expect(collection.empty()).to.be.an.instanceof(EnhancedElement.default)
      })
    })

    describe('#remove()', function() {
      it('removes each element in a collection from the DOM', function() {
        var collection = new EnhancedElement.default(document.getElementsByClassName('class-A'))

        expect(document.getElementsByClassName('class-A')).to.have.length(2)
        collection.remove()
        expect(document.getElementsByClassName('class-A')).to.have.length(0)
      })
    })
  })
})
