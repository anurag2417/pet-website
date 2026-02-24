// pages/About.tsx
import React from 'react';

const About = () => {
  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>About PetPedia</h1>
      
      <div style={{ 
        backgroundColor: 'var(--neutral-white)', 
        padding: '2rem', 
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--sage-green)', marginBottom: '1rem' }}>Our Mission</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            At PetPedia, we believe that every pet deserves the best possible care. Our mission is to provide 
            accurate, comprehensive, and accessible information about pet care to owners and enthusiasts worldwide. 
            Whether you're a first-time pet owner or an experienced enthusiast, we're here to support you with 
            reliable, veterinary-reviewed information.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--sage-green)', marginBottom: '1rem' }}>Our Commitment</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ color: 'var(--sage-green)', position: 'absolute', left: 0 }}>✓</span>
              <strong>Veterinary Reviewed:</strong> All our content is reviewed by qualified veterinarians
            </li>
            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ color: 'var(--sage-green)', position: 'absolute', left: 0 }}>✓</span>
              <strong>Evidence-Based:</strong> We base our information on current scientific research
            </li>
            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ color: 'var(--sage-green)', position: 'absolute', left: 0 }}>✓</span>
              <strong>Continuously Updated:</strong> We regularly update our content with the latest information
            </li>
            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ color: 'var(--sage-green)', position: 'absolute', left: 0 }}>✓</span>
              <strong>Free Access:</strong> Our information is freely available to everyone
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ color: 'var(--sage-green)', marginBottom: '1rem' }}>Our Team</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            PetPedia was founded by a team of veterinarians, animal behaviorists, and pet enthusiasts who 
            recognized the need for a reliable, comprehensive pet care resource. Our team continues to grow, 
            including contributors from various fields of animal care and welfare.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;