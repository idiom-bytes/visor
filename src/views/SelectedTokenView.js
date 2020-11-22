/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class SelectedTokenView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/SelectedTokenController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = SelectedTokenView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    scripts.concat(Promise.resolve()).reduce((loaded, loading) => {
      return loaded.then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script)

        return loading
      })
    })
  }

  render() {
    const proxies = Controller !== SelectedTokenView ? transformProxies(this.props.children) : {
      'from-icon': [],
      'from-ticker': [],
    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/amm-5745fe.webflow.css);
        ` }} />
        <span className="af-view">
          <div className="af-class-selectedtoken">{map(proxies['from-icon'], props => <img src="images/eth_icon_small.png" loading="lazy" alt {...{...props, className: `af-class-image-2 ${props.className || ''}`}}>{props.children}</img>)}
            {map(proxies['from-ticker'], props => <div {...{...props, className: `af-class-text-block-4 ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>ETH</React.Fragment>}</div>)}
          </div>
        </span>
      </span>
    )
  }
}

export default SelectedTokenView

/* eslint-enable */