/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [
  fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=5fb9f3345977972da8646063").then(body => body.text()),
  fetch("js/webflow.js").then(body => body.text()),
]

let Controller

class IndexView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/IndexController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = IndexView

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
    const proxies = Controller !== IndexView ? transformProxies(this.props.children) : {
      'from-amount': [],
      'from-icon': [],
      'from-ticker': [],
      'inverse-order': [],
      'to-amount': [],
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
          <div>
            <div data-collapse="medium" data-animation="default" data-duration={400} role="banner" className="af-class-navbar w-nav">
              <div className="w-container">
                <a href="#" className="af-class-brand w-nav-brand" />
                <nav role="navigation" className="af-class-nav-menu w-nav-menu">
                  <a href="#" className="af-class-nav-link w-nav-link">Swap</a>
                </nav>
                <div className="w-nav-button">
                  <div className="w-icon-nav-menu" />
                </div>
              </div>
            </div>
            <div className="af-class-div-block">
              <div className="af-class-div-block-2">
                <div>
                  <div className="af-class-div-block-3">
                    <div className="af-class-text-block">From</div>
                    <div className="w-form">
                      <form id="email-form" name="email-form" data-name="Email Form" className="af-class-form">{map(proxies['from-amount'], props => <input type="text" maxLength={256} name="name" data-name="Name" placeholder={0.0} id="name" {...{...props, className: `af-class-text-field w-input ${props.className || ''}`}}>{props.children}</input>)}
                        <div className="af-class-selectedtoken">{map(proxies['from-icon'], props => <img src="images/eth_icon_small.png" loading="lazy" alt {...{...props, className: `af-class-image-2 ${props.className || ''}`}}>{props.children}</img>)}
                          {map(proxies['from-ticker'], props => <div {...{...props, className: `af-class-text-block-4 ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>ETH</React.Fragment>}</div>)}
                        </div>
                      </form>
                      <div className="w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    </div>
                  </div>
                  <div className="af-class-div-block-6">
                    <a href="#" className="w-inline-block">{map(proxies['inverse-order'], props => <img src="images/arrow_symbol.png" loading="lazy" alt {...{...props, className: `af-class-image-3 ${props.className || ''}`}}>{props.children}</img>)}</a>
                  </div>
                  <div className="af-class-div-block-3">
                    <div className="af-class-text-block">To</div>
                    <div className="w-form">
                      <form id="email-form" name="email-form" data-name="Email Form" className="af-class-form">{map(proxies['to-amount'], props => <input type="text" maxLength={256} name="name-2" data-name="Name 2" placeholder={0.0} id="name-2" {...{...props, className: `af-class-text-field w-input ${props.className || ''}`}}>{props.children}</input>)}
                        <div className="af-class-selecttoken">
                          <div className="af-class-selecttokentext">Select A Token</div>
                        </div>
                      </form>
                      <div className="w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="af-class-div-block-7">
                  <div className="af-class-div-block-4">
                    <div className="af-class-text-block-2">Calculated Slippage</div>
                    <div className="af-class-text-block-3">2%</div>
                  </div>
                  {map(proxies['connect-wallet'], props => <a href="#" {...{...props, className: `af-class-button w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Connect&nbsp;Wallet</React.Fragment>}</a>)}
                </div>
              </div>
            </div>
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default IndexView

/* eslint-enable */