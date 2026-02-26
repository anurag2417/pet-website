// src/components/PrintCareSheet.tsx
import React from 'react';
import type { Pet } from '../data/petData';

interface PrintCareSheetProps {
  pet: Pet;
  onClose: () => void;
}

const PrintCareSheet: React.FC<PrintCareSheetProps> = ({ pet, onClose }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print the care sheet');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${pet.name} Care Sheet - Petopedia</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 2rem;
              max-width: 1200px;
              margin: 0 auto;
              background: #fff;
            }
            
            .header {
              text-align: center;
              margin-bottom: 2rem;
              padding-bottom: 1rem;
              border-bottom: 3px solid #4caf9e;
            }
            
            h1 {
              color: #2c3e50;
              font-size: 2.5rem;
              margin-bottom: 0.5rem;
            }
            
            .subtitle {
              color: #666;
              font-size: 1.1rem;
            }
            
            .quick-facts {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 1rem;
              margin-bottom: 2rem;
            }
            
            .fact-card {
              background: #f8f9fa;
              padding: 1rem;
              border-radius: 8px;
              text-align: center;
              border-left: 4px solid #4caf9e;
            }
            
            .fact-label {
              font-size: 0.9rem;
              color: #666;
              text-transform: uppercase;
              margin-bottom: 0.5rem;
            }
            
            .fact-value {
              font-size: 1.2rem;
              font-weight: bold;
              color: #2c3e50;
            }
            
            .difficulty-badge {
              display: inline-block;
              padding: 0.3rem 1rem;
              border-radius: 20px;
              font-size: 0.9rem;
              font-weight: bold;
            }
            
            .difficulty-easy {
              background: #d4edda;
              color: #155724;
            }
            
            .difficulty-moderate {
              background: #fff3cd;
              color: #856404;
            }
            
            .difficulty-expert {
              background: #f8d7da;
              color: #721c24;
            }
            
            .care-section {
              margin-bottom: 2rem;
              page-break-inside: avoid;
            }
            
            .care-section h2 {
              color: #4caf9e;
              border-bottom: 2px solid #4caf9e;
              padding-bottom: 0.5rem;
              margin-bottom: 1rem;
              font-size: 1.5rem;
            }
            
            .care-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 2rem;
            }
            
            ul {
              list-style: none;
              padding: 0;
            }
            
            li {
              margin-bottom: 0.5rem;
              padding-left: 1.5rem;
              position: relative;
            }
            
            li::before {
              content: "•";
              color: #4caf9e;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
            
            .fun-facts {
              background: #f8f9fa;
              padding: 1.5rem;
              border-radius: 8px;
              margin: 2rem 0;
            }
            
            .fun-facts h2 {
              color: #4caf9e;
              margin-bottom: 1rem;
            }
            
            .footer {
              margin-top: 2rem;
              padding-top: 1rem;
              border-top: 2px dashed #ccc;
              text-align: center;
              color: #666;
              font-size: 0.9rem;
            }
            
            .print-button {
              text-align: center;
              margin: 2rem 0;
            }
            
            .btn-print {
              background: #4caf9e;
              color: white;
              border: none;
              padding: 1rem 2rem;
              font-size: 1.1rem;
              border-radius: 5px;
              cursor: pointer;
              font-weight: bold;
            }
            
            .btn-print:hover {
              background: #3d8b7e;
            }
            
            @media print {
              .no-print {
                display: none;
              }
              
              body {
                padding: 0.5in;
              }
              
              .quick-facts {
                break-inside: avoid;
              }
              
              .care-section {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${pet.name} Care Sheet</h1>
            <p class="subtitle">${pet.summary}</p>
          </div>
          
          <div class="quick-facts">
            <div class="fact-card">
              <div class="fact-label">Lifespan</div>
              <div class="fact-value">${pet.lifespan}</div>
            </div>
            <div class="fact-card">
              <div class="fact-label">Adult Size</div>
              <div class="fact-value">${pet.size}</div>
            </div>
            <div class="fact-card">
              <div class="fact-label">Temperament</div>
              <div class="fact-value">${pet.temperament.split(',')[0]}</div>
            </div>
            <div class="fact-card">
              <div class="fact-label">Care Level</div>
              <div class="fact-value">
                <span class="difficulty-badge difficulty-${pet.difficulty.toLowerCase()}">
                  ${pet.difficulty}
                </span>
              </div>
            </div>
          </div>
          
          <div class="care-grid">
            <div class="care-section">
              <h2>🏠 Habitat & Environment</h2>
              <ul>
                ${pet.habitat.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            
            <div class="care-section">
              <h2>🥕 Diet & Nutrition</h2>
              <ul>
                ${pet.diet.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            
            <div class="care-section">
              <h2>💚 Health & Wellness</h2>
              <ul>
                ${pet.health.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            
            <div class="care-section">
              <h2>🤝 Handling & Behavior</h2>
              <ul>
                ${pet.behavior.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="fun-facts">
            <h2>⭐ Fun Facts</h2>
            <ul>
              ${pet.funFacts.map(fact => `<li>${fact}</li>`).join('')}
            </ul>
          </div>
          
          <div class="footer">
            <p>Generated by Petopedia - Your comprehensive pet care guide</p>
            <p>www.Petopedia.com | ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="no-print print-button">
            <button class="btn-print" onclick="window.print()">Print Care Sheet</button>
            <button class="btn-print" onclick="window.close()" style="margin-left: 1rem; background: #666;">Close</button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem'
        }}>
          🖨️
        </div>
        <h2 style={{
          marginBottom: '1rem',
          color: 'var(--text-primary)'
        }}>
          Print Care Sheet
        </h2>
        <p style={{
          marginBottom: '2rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6'
        }}>
          This will open a printer-friendly version of the {pet.name} care sheet in a new window. Make sure to allow pop-ups for this site.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={handlePrint}
            className="btn btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>🖨️</span>
            Open Print Version
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintCareSheet;