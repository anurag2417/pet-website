// src/components/PDFCareSheet.tsx
import React from 'react';
import type { Pet } from '../data/petData';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PDFCareSheetProps {
  pet: Pet;
  onClose: () => void;
}

const PDFCareSheet: React.FC<PDFCareSheetProps> = ({ pet, onClose }) => {
  const generatePDF = async () => {
    try {
      // Create new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Colors
      const primaryColor: [number, number, number] = [76, 175, 158]; // Teal green
      const textColor: [number, number, number] = [51, 51, 51];
      const lightGray: [number, number, number] = [245, 245, 245];

      // Add title
      doc.setFontSize(28);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`${pet.name} Care Sheet`, 20, 20);

      // Add subtitle/summary
      doc.setFontSize(12);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFont('helvetica', 'italic');
      
      // Split long summary into multiple lines
      const splitSummary = doc.splitTextToSize(pet.summary, 170);
      doc.text(splitSummary, 20, 30);

      // Add date
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 45);

      // Add decorative line
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(1);
      doc.line(20, 50, 190, 50);

      let yPos = 60;

      // Quick Facts Table
      doc.setFontSize(16);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.text('Quick Facts', 20, yPos);
      yPos += 5;

      const quickFactsData = [
        ['Lifespan', 'Adult Size', 'Temperament', 'Care Level'],
        [pet.lifespan, pet.size, pet.temperament.split(',')[0], pet.difficulty]
      ];

      autoTable(doc, {
        startY: yPos,
        head: [quickFactsData[0]],
        body: [quickFactsData[1]],
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center'
        },
        bodyStyles: {
          fillColor: lightGray,
          textColor: textColor,
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 45 },
          1: { cellWidth: 45 },
          2: { cellWidth: 45 },
          3: { cellWidth: 45 }
        }
      });

      yPos = (doc as any).lastAutoTable.finalY + 10;

      // Habitat Section
      doc.setFontSize(16);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.text('🏠 Habitat & Environment', 20, yPos);
      yPos += 5;

      const habitatData = pet.habitat.map(item => [item]);
      autoTable(doc, {
        startY: yPos,
        body: habitatData,
        theme: 'plain',
        styles: {
          fontSize: 11,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 170 }
        }
      });

      yPos = (doc as any).lastAutoTable.finalY + 10;

      // Diet Section
      doc.setFontSize(16);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('🥕 Diet & Nutrition', 20, yPos);
      yPos += 5;

      const dietData = pet.diet.map(item => [item]);
      autoTable(doc, {
        startY: yPos,
        body: dietData,
        theme: 'plain',
        styles: {
          fontSize: 11,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 170 }
        }
      });

      yPos = (doc as any).lastAutoTable.finalY + 10;

      // Check if we need a new page for remaining content
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Health Section
      doc.setFontSize(16);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('💚 Health & Wellness', 20, yPos);
      yPos += 5;

      const healthData = pet.health.map(item => [item]);
      autoTable(doc, {
        startY: yPos,
        body: healthData,
        theme: 'plain',
        styles: {
          fontSize: 11,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 170 }
        }
      });

      yPos = (doc as any).lastAutoTable.finalY + 10;

      // Behavior Section
      doc.setFontSize(16);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('🤝 Handling & Behavior', 20, yPos);
      yPos += 5;

      const behaviorData = pet.behavior.map(item => [item]);
      autoTable(doc, {
        startY: yPos,
        body: behaviorData,
        theme: 'plain',
        styles: {
          fontSize: 11,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 170 }
        }
      });

      yPos = (doc as any).lastAutoTable.finalY + 10;

      // Check if we need a new page for fun facts
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Fun Facts Section
      doc.setFontSize(16);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('⭐ Fun Facts', 20, yPos);
      yPos += 5;

      const funFactsData = pet.funFacts.map(fact => [fact]);
      autoTable(doc, {
        startY: yPos,
        body: funFactsData,
        theme: 'plain',
        styles: {
          fontSize: 11,
          fontStyle: 'italic',
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 170 }
        }
      });

      yPos = (doc as any).lastAutoTable.finalY + 15;

      // Add footer with website info
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.setFont('helvetica', 'italic');
      doc.text('Generated by PetPedia - Your comprehensive pet care guide', 20, 280);
      doc.text('www.petpedia.com', 20, 285);

      // Add page numbers
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, 180, 290);
      }

      // Save the PDF
      doc.save(`${pet.name.replace(/\s+/g, '-').toLowerCase()}-care-sheet.pdf`);
      
      // Close the modal
      onClose();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
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
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        animation: 'modalFadeIn 0.3s ease-out'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem'
        }}>
          📄
        </div>
        <h2 style={{
          marginBottom: '1rem',
          color: 'var(--text-primary)'
        }}>
          Download PDF Care Sheet
        </h2>
        <p style={{
          marginBottom: '1.5rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6'
        }}>
          Get a beautifully formatted PDF guide for {pet.name} that you can save, print, or share.
        </p>
        
        <div style={{
          backgroundColor: 'var(--secondary-dark)',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '2rem',
          textAlign: 'left',
          border: '1px solid var(--border-color)'
        }}>
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>PDF includes:</h4>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            fontSize: '0.95rem'
          }}>
            <li style={{ marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-green)' }}>✓</span> Complete care guide
            </li>
            <li style={{ marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-green)' }}>✓</span> Quick facts table
            </li>
            <li style={{ marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-green)' }}>✓</span> Habitat requirements
            </li>
            <li style={{ marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-green)' }}>✓</span> Diet & nutrition
            </li>
            <li style={{ marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-green)' }}>✓</span> Health & wellness tips
            </li>
            <li style={{ marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-green)' }}>✓</span> Fun facts
            </li>
          </ul>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={generatePDF}
            className="btn btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 2rem'
            }}
          >
            <span>📥</span>
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{
              padding: '0.8rem 2rem'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFCareSheet;