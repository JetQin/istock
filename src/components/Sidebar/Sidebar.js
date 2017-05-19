import React, { Component } from 'react';
import { Link } from 'react-router'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (

      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <Link to={'/dashboard'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> Dashboard <span className="badge badge-info">NEW</span></Link>
            </li>
            <li className={this.activeRoute("/stocks")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-puzzle"></i> Stocks</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <Link to={'/stocks/basic'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Basic</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/stocks/chart'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> g2-Chart</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/stocks/candlestick'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> g2-CandleStick</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/stocks/table'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Ant-Table</Link>
                </li>
                 <li className="nav-item">
                  <Link to={'/stocks/current'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Current</Link>
                </li>
                 <li className="nav-item">
                  <Link to={'/stocks/history'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> History</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
