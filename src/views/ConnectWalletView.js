/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class ConnectWalletView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/ConnectWalletController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = ConnectWalletView

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
    const proxies = Controller !== ConnectWalletView ? transformProxies(this.props.children) : {
      'connect-wallet': [],
    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/amm-5745fe.webflow.css);
        ` }} />
        <span className="af-view">
          <div className="af-class-div-block-7">
            <div className="af-class-div-block-4">
              <div className="af-class-text-block-2">Calculated Slippage</div>
              <div className="af-class-text-block-3">2%</div>
            </div>
            {map(proxies['connect-wallet'], props => <a href="#" {...{...props, className: `af-class-button w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Connect&nbsp;Wallet</React.Fragment>}</a>)}
          </div>
        </span>
      </span>
    )
  }
}

export default ConnectWalletView

/* eslint-enable */