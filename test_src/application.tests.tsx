/// <reference path="../typings/index.d.ts" />

require('./dom') // tslint:disable-line
import { expect } from 'chai'
import * as TestUtils from 'react-addons-test-utils'

import { Application } from '../app_src/renderer/Application'
import * as React from 'react' // tslint:disable-line

describe('application', function() {
  this.timeout(5000)
  it('load two items dynamically upon start', (done) => {
    const result = TestUtils.renderIntoDocument(<Application />)
    let loadingImage = TestUtils.scryRenderedDOMComponentsWithTag(result as any, 'img')
    let listItems = TestUtils.scryRenderedDOMComponentsWithTag(result as any, 'li')
    expect(loadingImage).to.have.length(1)
    expect(listItems).to.have.length(0)

    setTimeout( () => {
      listItems = TestUtils.scryRenderedDOMComponentsWithTag(result as any, 'li')
      loadingImage = TestUtils.scryRenderedDOMComponentsWithTag(result as any, 'img')
      expect(loadingImage).to.have.length(0)
      expect(listItems).to.have.length(2)
      done()
    }, 2000)
  })
})
