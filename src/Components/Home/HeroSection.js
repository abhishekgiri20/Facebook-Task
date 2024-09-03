import React from "react";
import "./HeroSection.css";
import heroImage from "../../Assets/heroImage.jpg";
import profileImage from "../../Assets/profileImage.jpg";
const HeroSection = () => {
  return (
    <>
      <section>
        <div className="container col-md-8">
          <div className="row">
            <div className="hero-container   mt-2 mb-4 ">
              <div className="hero-image  border-bottom">
                <img src={heroImage} alt="" className="rounded-5  " />
                <div className="profile-container ">
                  <div className="profile-image">
                    <img src={profileImage} alt="" />
                  </div>
                  <div className="profile-name">
                    <h3>Jerry Luis</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="timeline">
          <a href="/">Timeline</a>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
