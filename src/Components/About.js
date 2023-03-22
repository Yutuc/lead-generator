import React, { Component } from "react";
import Fade from "react-reveal";
import TextField from '@material-ui/core/TextField';

class About extends Component {
  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const profilepic = "images/" + this.props.data.image;
    const bio = this.props.data.bio;
    const phone = this.props.data.phone;
    const email = this.props.data.email;

    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="three columns">
              <img
                className="profile-pic"
                src={profilepic}
                alt="David Halliday Profile Pic"
              />
            </div>
            <div className="nine columns main-col">
              <h2 style={{color: '#ECAE00'}} >About Me</h2>

              <p>{bio}</p>
              <div className="row">
                <div className="columns contact-details">

                  <h2 style={{color: '#ECAE00'}}>Contact Details</h2>
                  <p className="address">
                    <span>{name}</span>
                    <br />
                    <span>{phone}</span>
                    <br />
                    <span>{email}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default About;
