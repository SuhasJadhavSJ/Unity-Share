import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Unity Share</h1>
          <p>Your trusted community resource sharing platform.</p>
          <Link to="/signup" className="cta-button">Join Now</Link>
        </div>
        <div className="hero-image">
          <img src="/images/hero-image.jpg" alt="Community Sharing" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <i className="fas fa-users"></i>
            <h3>Community Driven</h3>
            <p>Connect with your local community and help each other by sharing essential resources.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-box"></i>
            <h3>Resource Listings</h3>
            <p>Donate or request resources like food, clothing, and books with ease.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Location Based</h3>
            <p>Easily find resources near you with our integrated location services.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-list">
          <div className="testimonial-item">
            <p>"Unity Share has been a lifesaver for our family. The platform made it easy for us to donate unused items to people who need them more."</p>
            <h4>John Doe</h4>
          </div>
          <div className="testimonial-item">
            <p>"Finding local help has never been easier. I was able to request food resources during a tough time, and the community was so generous."</p>
            <h4>Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Get Started with Unity Share</h2>
        <p>Join our platform and start sharing today!</p>
        <Link to="/signup" className="cta-button">Sign Up Now</Link>
      </section>
    </div>
  );
};

export default LandingPage;
