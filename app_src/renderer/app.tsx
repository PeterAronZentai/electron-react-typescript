/// <reference path="../../typings/index.d.ts" />

import { Application } from './Application'
import * as React from 'react' // tslint:disable-line
import { render } from 'react-dom'

export function start (containerElement) {
  render(<Application />, containerElement)
}
