// src/data/petData.ts

// Define the Pet type
export interface Pet {
  id: string;
  name: string;
  summary: string;
  image: string;
  lifespan: string;
  size: string;
  temperament: string;
  difficulty: 'Easy' | 'Moderate' | 'Expert';
  habitat: string[];
  diet: string[];
  health: string[];
  behavior: string[];
  funFacts: string[];
  gallery: string[];
}

// Sample pet data
export const petData: Record<string, Pet> = {
  // Hamster profile (as a fallback example)
  'small-mammals-hamster': {
    id: 'hamster',
    name: 'Syrian Hamster',
    summary: 'A small, solitary nocturnal rodent known for its cheek pouches.',
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800',
    lifespan: '2-3 years',
    size: '5-7 inches',
    temperament: 'Curious, Solitary, Nocturnal',
    difficulty: 'Easy',
    habitat: [
      'Minimum cage size: 24" x 12" x 12"',
      'Depth of 2-3 inches of paper-based bedding',
      'Wheel (8-10 inches diameter) for exercise',
      'Hiding houses and tunnels',
      'Keep temperature between 65-75°F'
    ],
    diet: [
      'High-quality hamster pellet mix',
      'Fresh vegetables (carrots, cucumber, broccoli)',
      'Small amounts of fruits as treats',
      'Clean, fresh water daily',
      'Avoid: almonds, citrus, onions, chocolate'
    ],
    health: [
      'Watch for wet tail (diarrhea)',
      'Check teeth for overgrowth',
      'Clean eyes and nose (no discharge)',
      'Smooth, clean coat',
      'Regular veterinary check-ups'
    ],
    behavior: [
      'Nocturnal - most active at night',
      'Solitary - must live alone',
      'Loves to burrow and nest',
      'Can be tamed with gentle handling',
      'Needs daily exercise outside cage'
    ],
    funFacts: [
      'A hamster\'s teeth never stop growing!',
      'They can store food in their cheek pouches equal to their body weight',
      'Hamsters are born blind and hairless',
      'They can run up to 5 miles per night on their wheel'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400',
      'https://images.unsplash.com/photo-1548767797-d0c0d4c24c0c?w=400',
      'https://images.unsplash.com/photo-1555169062-013468b47731?w=400',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'
    ]
  },

  // Dog profile example
  'dogs-labrador': {
    id: 'labrador',
    name: 'Labrador Retriever',
    summary: 'Friendly, active, and outgoing family dogs with a gentle temperament.',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=800',
    lifespan: '10-12 years',
    size: '21.5-24.5 inches, 55-80 lbs',
    temperament: 'Friendly, Active, Outgoing, Gentle',
    difficulty: 'Easy',
    habitat: [
      'House with fenced yard ideal',
      'Need space to run and play',
      'Comfortable indoor living space',
      'Cool, shaded area outdoors',
      'Weather-appropriate shelter'
    ],
    diet: [
      'High-quality dog food (2.5-3 cups daily)',
      'Divided into two meals',
      'Lean protein sources',
      'Limited treats to prevent obesity',
      'Fresh water always available'
    ],
    health: [
      'Prone to hip and elbow dysplasia',
      'Watch for obesity',
      'Regular exercise needed',
      'Annual veterinary check-ups',
      'Keep vaccinations current'
    ],
    behavior: [
      'Very social - needs family interaction',
      'High energy - daily exercise required',
      'Loves to swim and retrieve',
      'Good with children and other pets',
      'Responds well to positive training'
    ],
    funFacts: [
      'Labs are the most popular dog breed in the USA',
      'They have water-repellent double coats',
      'Their otter-like tails act as rudders while swimming',
      'They keep their puppy-like temperament well into old age'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400',
      'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?w=400',
      'https://images.unsplash.com/photo-1544567743-5bf5c4497ef7?w=400',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'
    ]
  },

  // Cat profile example
  'cats-siamese': {
    id: 'siamese',
    name: 'Siamese Cat',
    summary: 'Vocal, social, and intelligent cats known for their distinctive color points.',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
    lifespan: '15-20 years',
    size: '8-12 inches, 8-12 lbs',
    temperament: 'Vocal, Social, Intelligent, Affectionate',
    difficulty: 'Moderate',
    habitat: [
      'Indoor-only living recommended',
      'Cat trees and climbing structures',
      'Scratching posts',
      'Comfortable perches near windows',
      'Multiple litter boxes'
    ],
    diet: [
      'High-quality cat food',
      'Mix of wet and dry food',
      'Portion control to prevent obesity',
      'Fresh water fountain (encourages drinking)',
      'Avoid: onions, garlic, chocolate'
    ],
    health: [
      'Prone to dental issues',
      'Watch for respiratory problems',
      'Regular vet check-ups',
      'Keep litter box clean',
      'Maintain healthy weight'
    ],
    behavior: [
      'Very vocal - loves to "talk"',
      'Forms strong bonds with owners',
      'Playful and energetic',
      'Can be trained to fetch',
      'Needs mental stimulation'
    ],
    funFacts: [
      'Siamese cats are born white and develop their color points later',
      'They were considered sacred in ancient Siam (Thailand)',
      'Their eyes are always blue',
      'They have been in many movies including "Lady and the Tramp"'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400',
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400'
    ]
  }
};

// You can add more pet profiles following the same structure