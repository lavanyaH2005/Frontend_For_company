import React from 'react';
import Navbar from '../components/Navbar';
import { PhoneIcon, MailIcon, MapPinIcon, LocationPinSmall } from '../components/Icons';
import '../styles/HomePage.css';
import villaImg from '../assets/villa.png';
import apartmentImg from '../assets/apartment.png';
import rowhouseImg from '../assets/rowhouse.png';
import plotImg from '../assets/plot.png';
import officeImg from '../assets/office.png';
import communityImg from '../assets/community.png';


const STATS = [
  { num: '500+',  label: 'Properties Listed'  },
  { num: '12+',   label: 'Years Experience'   },
  { num: '1,200+',label: 'Happy Families'     },
  { num: '98%',   label: 'Client Satisfaction'},
];

const PROPERTIES = [
  { image: villaImg, badge: 'For Sale',   price: '₹2.5 Cr', title: 'Luxury Garden Villa',    loc: 'Adyar, Chennai',    beds: 4, baths: 3, sqft: '3,200', bg: '#EEF2FA' },
  { image: apartmentImg, badge: 'For Rent',   price: '₹45K/mo', title: 'Modern Sky Apartment',   loc: 'OMR, Chennai',      beds: 3, baths: 2, sqft: '1,850', bg: '#EAF5F0' },
  { image: rowhouseImg, badge: 'New Launch', price: '₹85 L',   title: 'Premium Row House',      loc: 'Coimbatore',        beds: 3, baths: 2, sqft: '2,100', bg: '#FDF5E6' },
  { image: plotImg, badge: 'Plot',       price: '₹42 L',   title: 'DTCP Approved Plot',     loc: 'ECR, Chennai',      beds: null, baths: null, sqft: '2,400', bg: '#F0EEF8' },
  { image: officeImg, badge: 'For Sale',   price: '₹1.8 Cr', title: 'Corporate Office Space', loc: 'T. Nagar, Chennai', beds: null, baths: 4,    sqft: '4,000', bg: '#FBF0F0' },
  { image: communityImg, badge: 'New Build',  price: '₹1.2 Cr', title: 'Gated Community Home',   loc: 'Madurai',           beds: 4, baths: 3, sqft: '2,800', bg: '#EAF5FA' },
];

const WHY_US = [
  { icon: '🏆', title: 'Verified Listings',  desc: 'Every property is verified and legally cleared before being listed on our platform.' },
  { icon: '🤝', title: 'Expert Guidance',    desc: 'Our experienced agents guide you through every step of your property journey.' },
  { icon: '💰', title: 'Best Price Promise', desc: 'We negotiate on your behalf to ensure you get the most value for your investment.' },
  { icon: '🔒', title: 'Safe Transactions',  desc: '100% secure documentation with legal backing for complete peace of mind.' },
];

const CONTACT_ITEMS = [
  { icon: <PhoneIcon />, label: 'Phone',  value: '+91 98765 43210'              },
  { icon: <MailIcon />,  label: 'Email',  value: 'info@sowmiyaproperties.com'   },
  { icon: <MapPinIcon />,label: 'Office', value: 'T. Nagar, Chennai, Tamil Nadu' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroSection({ user }) {
  return (
    <section className="hero-section" id="top">
      <div className="hero-content">
        <div className="hero-badge">Premium Real Estate</div>
        <h1>
          Find Your Perfect{' '}
          <em>Dream Home</em>{' '}
          in Tamil Nadu
        </h1>
        <p>
          Trusted by thousands of families. Discover curated properties
          across prime locations.
        </p>
        {user && (
          <div className="hero-welcome">
            <div className="dot" aria-hidden="true" />
            Welcome back, {user.name}
          </div>
        )}
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="container">
        <div className="d-flex justify-content-center align-items-stretch flex-wrap gap-3">
          {STATS.map(({ num, label }, i) => (
            <div key={i} className="stat-item">
              <div className="stat-num">{num}</div>
              <div className="stat-lbl">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyCard({
  image,
  badge,
  price,
  title,
  loc,
  beds,
  baths,
  sqft
}) {

  return (

    <div className="prop-card">
      <div className="prop-img">

        <img
          src={image}
          alt={title}
          className="property-image"
        />

        <span className="prop-badge">
          {badge}
        </span>

      </div>

      {/* Property Details */}
      <div className="prop-body">

        <div className="prop-price">
          {price}
        </div>

        <div className="prop-title">
          {title}
        </div>

        <div className="prop-loc">
          <LocationPinSmall />
          {loc}
        </div>

        <div className="prop-detail">

          {beds && (
            <span className="prop-spec">
              {beds} Beds
            </span>
          )}

          {baths && (
            <span className="prop-spec">
              {baths} Baths
            </span>
          )}

          <span className="prop-spec">
            {sqft} sq.ft
          </span>

        </div>

        <button className="btn-view">
          View Details
        </button>

      </div>

    </div>
  );
}

function PropertiesSection() {
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="section-title serif">Featured Properties</h2>
        <div className="gold-divider mt-3" />
        <p className="section-sub mt-3">
          Handpicked listings across Tamil Nadu's finest locations
        </p>
      </div>
      <div className="row g-4">
        {PROPERTIES.map((prop, i) => (
          <div key={i} className="col-lg-4 col-md-6">
            <PropertyCard {...prop} />
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="why-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title serif">Why Choose Us</h2>
          <div className="gold-divider mt-3" />
        </div>
        <div className="row g-0">
          {WHY_US.map(({ icon, title, desc }, i) => (
            <div key={i} className="col-md-3 col-6">
              <div className="why-item">
                <div className="why-icon" aria-hidden="true">{icon}</div>
                <h5>{title}</h5>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="serif text-white" style={{ fontSize: '2rem' }}>
            Get In Touch
          </h2>
          <div className="gold-divider mt-3" />
          <p className="mt-3" style={{ color: 'rgba(255,255,255,.65)', fontSize: '.97rem' }}>
            We'd love to help you find your dream property
          </p>
        </div>
        <div className="row g-4 justify-content-center">
          {CONTACT_ITEMS.map(({ icon, label, value }, i) => (
            <div key={i} className="col-md-4 col-sm-6">
              <div className="contact-card">
                <div className="c-icon">{icon}</div>
                <h6>{label}</h6>
                <p>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({ user, onLogout, onLoginClick }) {
  return (
    <>
      <Navbar
        isLoggedIn={!!user}
        onLogout={onLogout}
        onLoginClick={onLoginClick}
      />
      <HeroSection user={user} />
      <StatsBar />
      <PropertiesSection />
      <WhyUsSection />
      <ContactSection />
      <footer className="sp-footer">
        &copy; 2025 <span>Sowmiya Properties</span>. All rights reserved. | Chennai, Tamil Nadu
      </footer>
    </>
  );
}

export default HomePage;
