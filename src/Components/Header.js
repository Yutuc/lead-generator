import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";

class Header extends Component {
  render() {
    if (!this.props.data) return null;

    const name = this.props.data.brand_name;
    const description = this.props.data.description;

    let config = {
      num: [0, 1],
      rps: 1,
      life: 50,
      v: .05,
      tha: [-40, 40],
      body: "./images/black_car.png", // Whether to render pictures
      alpha: 1,
      scale: [1, 0.4],
      position: "all", // all or center or {x:1,y:1,width:100,height:100}
      cross: "cross", // cross or bround
      random: 25,  // or null,
      color: "#ffffff"
    };

    return (
      <header id="home">
        {/* <ParticlesBg type="circle" config={config} bg={true} /> */}

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a style={{fontSize: '14px'}} className="smoothscroll" href="#home">
                Home
              </a>
            </li>

            <li>
              <a style={{fontSize: '14px'}} className="smoothscroll" href="#about">
                About
              </a>
            </li>

            <li>
              <a style={{fontSize: '14px'}} className="smoothscroll" href="#quiz">
                Inquire
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
            {/* '#FFD200' */}
              <h1 style={{color: '#ECAE00', paddingTop: "125px"}} className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
            {/* style={{color: '#000524'}} */}
              <h3 style={{color: '#ECAE00'}}>{description}.</h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <a href="#quiz" className="smoothscroll button btn project-btn">
                  <i className="fa fa-book"></i>Get Started
                </a>
              </ul>
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
