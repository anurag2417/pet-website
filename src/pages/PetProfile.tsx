// src/pages/PetProfile.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import petData from '../data/petData';

// 1. Define the shape of a Pet object to fix TypeScript errors
interface Pet {
  name: string;
  summary: string;
  image: string;
  lifespan: string;
  size: string;
  temperament: string;
  difficulty: string;
  habitat: string[];
  diet: string[];
  health: string[];
  behavior: string[];
  funFacts: string[];
  gallery: string[];
}

const PetProfile: React.FC = () => {
  const { category, name } = useParams<{ category: string; name: string }>();
  
  // Construct the Lookup key
  const petKey = `${category}-${name}`;

  // 2. Lookup the pet, with a fallback (using 'unknown' to bypass strict checks)
  const data = petData as unknown as Record<string, Pet>;
  const pet = data[petKey] || data['small-mammals-hamster']; 

  // 3. Handle the case where even the fallback fails
  if (!pet) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Pet profile not found</h2>
        <p>The pet you're looking for doesn't exist or hasn't been added yet.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="pet-profile">
        
        {/* Header Section */}
        <div className="pet-header">
          <img src={pet.image} alt={pet.name} className="pet-header-image" />
          <div className="pet-header-overlay">
            <h1 className="pet-name">{pet.name}</h1>
            <p className="pet-summary">{pet.summary}</p>
          </div>
        </div>

        {/* Quick Facts Section */}
        <div className="quick-facts">
          <div className="fact-card">
            <div className="fact-icon">⏳</div>
            <div className="fact-label">Average Lifespan</div>
            <div className="fact-value">{pet.lifespan}</div>
          </div>
          <div className="fact-card">
            <div className="fact-icon">📏</div>
            <div className="fact-label">Adult Size</div>
            <div className="fact-value">{pet.size}</div>
          </div>
          <div className="fact-card">
            <div className="fact-icon">😊</div>
            <div className="fact-label">Temperament</div>
            <div className="fact-value">{pet.temperament}</div>
          </div>
          <div className="fact-card">
            <div className="fact-icon">📊</div>
            <div className="fact-label">Difficulty of Care</div>
            <div className="fact-value">
              <span className={`difficulty-badge difficulty-${pet.difficulty.toLowerCase()}`}>
                {pet.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Care Guide Section */}
        <div className="care-guide">
          <h2>Care Guide</h2>
          <div className="care-grid">
            <div className="care-section">
              <h3>🏠 Habitat & Environment</h3>
              <ul>
                {pet.habitat.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="care-section">
              <h3>🥕 Diet & Nutrition</h3>
              <ul>
                {pet.diet.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="care-section">
              <h3>💚 Health & Wellness</h3>
              <ul>
                {pet.health.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="care-section">
              <h3>🤝 Handling & Behavior</h3>
              <ul>
                {pet.behavior.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="fun-facts">
          <h2>Fun Facts</h2>
          <div className="facts-grid">
            {pet.funFacts.map((fact, index) => (
              <div key={index} className="fact-trivia">
                {fact}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="gallery">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {pet.gallery.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${pet.name} ${index + 1}`} 
                className="gallery-image"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PetProfile;