// src/data/petData.ts

export interface Pet {
  id: string;
  category: string;
  categoryName: string;
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

export const pets: Pet[] = [
  // ==================== DOGS ====================
  {
    id: 'labrador-retriever',
    category: 'dogs',
    categoryName: 'Dogs',
    name: 'Labrador Retriever',
    summary: 'Friendly, active, and outgoing family dogs with a gentle temperament.',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=800',
    lifespan: '10-12 years',
    size: '21.5-24.5 inches, 55-80 lbs',
    temperament: 'Friendly, Active, Outgoing, Gentle, Intelligent',
    difficulty: 'Easy',
    habitat: [
      'House with fenced yard ideal',
      'Need space to run and play',
      'Comfortable indoor living space',
      'Cool, shaded area outdoors',
      'Weather-appropriate shelter',
      'Crate training recommended for puppies'
    ],
    diet: [
      'High-quality dog food (2.5-3 cups daily)',
      'Divided into two meals',
      'Lean protein sources (chicken, fish, beef)',
      'Limited treats to prevent obesity',
      'Fresh water always available',
      'Avoid grapes, raisins, chocolate, onions'
    ],
    health: [
      'Prone to hip and elbow dysplasia',
      'Watch for obesity - Labs love to eat!',
      'Regular exercise needed (1-2 hours daily)',
      'Annual veterinary check-ups',
      'Keep vaccinations current',
      'Prone to ear infections - clean regularly'
    ],
    behavior: [
      'Very social - needs family interaction',
      'High energy - daily exercise required',
      'Loves to swim and retrieve',
      'Good with children and other pets',
      'Responds well to positive training',
      'Can be destructive if bored or lonely'
    ],
    funFacts: [
      'Labs are the most popular dog breed in the USA for over 30 years',
      'They have water-repellent double coats',
      'Their otter-like tails act as rudders while swimming',
      'They keep their puppy-like temperament well into old age',
      'Yellow Labs are the most common color, but they come in black and chocolate too'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400',
      'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?w=400',
      'https://images.unsplash.com/photo-1544567743-5bf5c4497ef7?w=400',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'
    ]
  },
  {
    id: 'french-bulldog',
    category: 'dogs',
    categoryName: 'Dogs',
    name: 'French Bulldog',
    summary: 'Playful, adaptable companions with distinctive bat ears and smushed faces.',
    image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=800',
    lifespan: '10-12 years',
    size: '11-13 inches, 16-28 lbs',
    temperament: 'Playful, Adaptable, Affectionate, Alert, Intelligent',
    difficulty: 'Moderate',
    habitat: [
      'Perfect for apartments - low exercise needs',
      'Comfortable bed and cooling mat',
      'Avoid extreme heat and humidity',
      'Indoor living only',
      'Ramps for furniture access to protect joints'
    ],
    diet: [
      'High-quality dog food (1-1.5 cups daily)',
      'Split into two meals',
      'Watch portions carefully - prone to obesity',
      'Avoid foods that cause gas',
      'Fresh water always available'
    ],
    health: [
      'Brachycephalic syndrome - breathing difficulties',
      'Prone to heat stroke - keep cool',
      'Spinal issues - avoid jumping',
      'Skin fold infections - clean wrinkles daily',
      'Allergies common',
      'Regular vet check-ups essential'
    ],
    behavior: [
      'Moderate energy - short walks suffice',
      'Loves attention and cuddles',
      'Can be stubborn but responds to treats',
      'Good with other pets and children',
      'Tends to snore and drool',
      'Can be territorial - early socialization important'
    ],
    funFacts: [
      'French Bulldogs cannot swim due to their heavy bodies',
      'They were bred as miniature versions of English Bulldogs',
      'Their bat ears are the only distinctive feature not shared with English Bulldogs',
      'They are terrible barkers but excellent snorers',
      'Ranked as the 2nd most popular dog breed in the USA'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400',
      'https://images.unsplash.com/photo-1619359331506-5f4510f5a23d?w=400',
      'https://images.unsplash.com/photo-1623880845038-774ba8c63d1b?w=400',
      'https://images.unsplash.com/photo-1583337130417-3346c1be7dee?w=400'
    ]
  },

  // ==================== CATS ====================
  {
    id: 'siamese',
    category: 'cats',
    categoryName: 'Cats',
    name: 'Siamese Cat',
    summary: 'Vocal, social, and intelligent cats known for their distinctive color points and blue eyes.',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
    lifespan: '15-20 years',
    size: '8-12 inches, 8-12 lbs',
    temperament: 'Vocal, Social, Intelligent, Affectionate, Demanding',
    difficulty: 'Moderate',
    habitat: [
      'Indoor-only living recommended',
      'Cat trees and climbing structures',
      'Scratching posts (multiple)',
      'Comfortable perches near windows',
      'Multiple litter boxes (one per cat + one)',
      'Warm, cozy beds'
    ],
    diet: [
      'High-quality cat food',
      'Mix of wet and dry food',
      'Portion control to prevent obesity',
      'Fresh water fountain (encourages drinking)',
      'Avoid: onions, garlic, chocolate, grapes'
    ],
    health: [
      'Prone to dental issues - brush teeth regularly',
      'Watch for respiratory problems',
      'Regular vet check-ups',
      'Keep litter box clean',
      'Maintain healthy weight',
      'Prone to amyloidosis (kidney disease)'
    ],
    behavior: [
      'Very vocal - loves to "talk" to owners',
      'Forms strong bonds with specific people',
      'Playful and energetic throughout life',
      'Can be trained to fetch and walk on leash',
      'Needs mental stimulation and toys',
      'Dislikes being left alone for long periods'
    ],
    funFacts: [
      'Siamese cats are born completely white and develop their color points later',
      'They were considered sacred in ancient Siam (Thailand)',
      'Their eyes are always blue - the only cat breed with this trait',
      'They have been in many movies including "Lady and the Tramp"',
      'Traditional Siamese have crossed eyes - a trait bred out in modern lines'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400',
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400'
    ]
  },
  {
    id: 'maine-coon',
    category: 'cats',
    categoryName: 'Cats',
    name: 'Maine Coon',
    summary: 'Gentle giants with luxurious coats, tufted ears, and dog-like personalities.',
    image: 'https://images.unsplash.com/photo-1605716795088-44361b8bb9bf?w=800',
    lifespan: '12-15 years',
    size: '10-16 inches, 10-25 lbs',
    temperament: 'Gentle, Friendly, Intelligent, Playful, Dog-like',
    difficulty: 'Moderate',
    habitat: [
      'Need space - large cats need room',
      'Tall cat trees for climbing',
      'Large, sturdy scratching posts',
      'Comfortable window perches',
      'Multiple large litter boxes',
      'Cool areas - they have thick coats'
    ],
    diet: [
      'High-quality cat food',
      'Large portions due to size',
      'Mix of wet and dry food',
      'Joint supplements beneficial',
      'Fresh water always available',
      'Avoid overfeeding - monitor weight'
    ],
    health: [
      'Prone to hip dysplasia',
      'Hypertrophic cardiomyopathy (heart disease)',
      'Regular grooming essential',
      'Dental care important',
      'Watch for obesity',
      'Annual health screenings'
    ],
    behavior: [
      'Dog-like personality - follows owners',
      'Loves water - may play in bowls',
      'Gentle with children and other pets',
      'Playful well into adulthood',
      'Vocal with chirps and trills',
      'Enjoys interactive play'
    ],
    funFacts: [
      'Maine Coons are the largest domesticated cat breed',
      'They can have extra toes (polydactyl) - a common trait',
      'Their water-resistant coat helped them survive harsh winters',
      'They are known as "gentle giants"',
      'Some believe they originated from raccoons (scientifically impossible!)'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1605716795088-44361b8bb9bf?w=400',
      'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=400',
      'https://images.unsplash.com/photo-1587732785241-b516220c8f12?w=400',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400'
    ]
  },

  // ==================== SMALL MAMMALS ====================
  {
    id: 'syrian-hamster',
    category: 'small-mammals',
    categoryName: 'Small Mammals',
    name: 'Syrian Hamster',
    summary: 'A small, solitary nocturnal rodent known for its cheek pouches and golden coat.',
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800',
    lifespan: '2-3 years',
    size: '5-7 inches',
    temperament: 'Solitary, Nocturnal, Curious, Territorial',
    difficulty: 'Easy',
    habitat: [
      'Minimum cage size: 24" x 12" x 12"',
      'Depth of 2-3 inches of paper-based bedding',
      'Wheel (8-10 inches diameter) for exercise',
      'Hiding houses and tunnels',
      'Chew toys for dental health',
      'Keep temperature between 65-75°F'
    ],
    diet: [
      'High-quality hamster pellet mix',
      'Fresh vegetables (carrots, cucumber, broccoli)',
      'Small amounts of fruits as treats',
      'Occasional mealworms for protein',
      'Clean, fresh water daily',
      'Avoid: almonds, citrus, onions, chocolate'
    ],
    health: [
      'Watch for wet tail (diarrhea) - emergency',
      'Check teeth for overgrowth monthly',
      'Clean eyes and nose (no discharge)',
      'Smooth, clean coat indicates health',
      'Regular cage cleaning essential',
      'Find exotic vet familiar with hamsters'
    ],
    behavior: [
      'Strictly nocturnal - most active at night',
      'Solitary - must live alone after 8 weeks',
      'Loves to burrow and nest',
      'Can be tamed with gentle handling',
      'Needs daily exercise outside cage',
      'Hibernates if too cold - dangerous'
    ],
    funFacts: [
      'A hamster\'s teeth never stop growing - they need constant chewing',
      'They can store food in their cheek pouches equal to their body weight',
      'Hamsters are born blind, hairless, and helpless',
      'They can run up to 5 miles per night on their wheel',
      'Syrian hamsters are also called Golden or Teddy Bear hamsters'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400',
      'https://images.unsplash.com/photo-1548767797-d0c0d4c24c0c?w=400',
      'https://images.unsplash.com/photo-1555169062-013468b47731?w=400',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'
    ]
  },
  {
    id: 'rabbit',
    category: 'small-mammals',
    categoryName: 'Small Mammals',
    name: 'Domestic Rabbit',
    summary: 'Social, intelligent creatures that make wonderful indoor companions with proper care.',
    image: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=800',
    lifespan: '8-12 years',
    size: '8-20 inches, 2-10 lbs (varies by breed)',
    temperament: 'Social, Intelligent, Curious, Gentle, Playful',
    difficulty: 'Moderate',
    habitat: [
      'Minimum 4x4 feet exercise area',
      'Rabbit-proofed room or large pen',
      'Hide house for security',
      'Litter box with paper-based litter',
      'Hay rack and water bottle',
      'Cardboard boxes and tunnels for enrichment',
      'Temperature 60-70°F'
    ],
    diet: [
      'Unlimited timothy hay (80% of diet)',
      'Fresh vegetables daily (leafy greens)',
      'Limited pellets (1/4 cup per 5 lbs)',
      'Small amounts of fruit as treats',
      'Fresh water daily in bowl or bottle',
      'Avoid: iceberg lettuce, seeds, nuts, chocolate'
    ],
    health: [
      'Dental issues - teeth grow continuously',
      'GI stasis (digestive emergency) - watch for small poops',
      'Spay/neuter essential for health and behavior',
      'Check for flystrike in summer',
      'Trim nails regularly',
      'Find rabbit-savvy vet'
    ],
    behavior: [
      'Crepuscular - most active dawn and dusk',
      'Can be litter box trained',
      'Binkies (happy jumps) show joy',
      'Teeth purring when content',
      'May thump feet when scared',
      'Bond strongly with owners',
      'Can learn tricks and commands'
    ],
    funFacts: [
      'Rabbits have 360-degree vision except for a small blind spot in front of their nose',
      'Their teeth never stop growing - they need unlimited hay to wear them down',
      'Rabbits can jump up to 3 feet high',
      'A group of rabbits is called a herd',
      'They purr by grinding their teeth softly'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400',
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
      'https://images.unsplash.com/photo-1591561582301-7c7f904bb2c5?w=400',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400'
    ]
  },
  {
    id: 'guinea-pig',
    category: 'small-mammals',
    categoryName: 'Small Mammals',
    name: 'Guinea Pig',
    summary: 'Vocal, social rodents that thrive in pairs and love fresh vegetables.',
    image: 'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=800',
    lifespan: '5-7 years',
    size: '8-10 inches, 1.5-2.5 lbs',
    temperament: 'Social, Gentle, Vocal, Timid, Curious',
    difficulty: 'Easy',
    habitat: [
      'Minimum 7.5 square feet cage (bigger better)',
      'Solid floor - wire hurts feet',
      'Fleece or paper bedding',
      'Hide houses (multiple for pairs)',
      'Hay rack and food bowls',
      'Water bottle with metal spout',
      'Exercise time outside cage daily'
    ],
    diet: [
      'Unlimited timothy hay (70% of diet)',
      '1 cup fresh vegetables daily per pig',
      'High vitamin C pellets (1/8 cup)',
      'Small fruit treats occasionally',
      'Vitamin C supplement important',
      'Fresh water daily',
      'Avoid: dairy, meat, chocolate, seeds'
    ],
    health: [
      'Need vitamin C daily - can\'t produce own',
      'Watch for respiratory infections',
      'Dental problems common',
      'Bumblefoot from wire floors',
      'Check for mites and lice',
      'Find exotic vet experienced with guinea pigs'
    ],
    behavior: [
      'Must live in pairs or groups',
      'Vocal with distinct sounds (wheeking, purring)',
      "Popcorning - happy jumps when excited",
      'Need daily floor time',
      'Can learn routines and recognize owners',
      'May freeze when scared'
    ],
    funFacts: [
      'Guinea pigs are neither from Guinea nor pigs - they originated in the Andes',
      'They "wheek" loudly when they hear the fridge opening',
      'Baby guinea pigs are born fully furred with open eyes',
      'They sleep with their eyes open',
      'Their teeth grow continuously and need constant hay to wear down'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=400',
      'https://images.unsplash.com/photo-1607427293702-036b79d5a5d0?w=400',
      'https://images.unsplash.com/photo-1551817958-201b87e265bb?w=400',
      'https://images.unsplash.com/photo-1588943211326-5a54e9e255b0?w=400'
    ]
  },

  // ==================== BIRDS ====================
  {
    id: 'budgie',
    category: 'birds',
    categoryName: 'Birds',
    name: 'Budgerigar (Parakeet)',
    summary: 'Small, colorful parrots that can learn to talk and form strong bonds with owners.',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
    lifespan: '7-15 years',
    size: '7-8 inches, 1-1.5 oz',
    temperament: 'Social, Playful, Intelligent, Vocal, Curious',
    difficulty: 'Easy',
    habitat: [
      'Minimum cage size: 18" x 18" x 24"',
      'Bar spacing no more than 1/2 inch',
      'Variety of perches (different sizes)',
      'Toys - bells, mirrors, chew toys',
      'Cuttlebone for beak health',
      'Safe location away from drafts',
      'Out-of-cage time daily in safe room'
    ],
    diet: [
      'High-quality pellet diet (60-70%)',
      'Fresh vegetables daily (spinach, carrots)',
      'Small amount of seed as treat',
      'Fresh fruit occasionally',
      'Clean water daily',
      'Avoid: avocado, chocolate, caffeine, alcohol'
    ],
    health: [
      'Watch for respiratory issues',
      'Overgrown beak and nails need trimming',
      'Signs of illness: fluffed feathers, discharge',
      'Annual vet check-ups',
      'Quarantine new birds',
      'Find avian veterinarian'
    ],
    behavior: [
      'Very social - need daily interaction',
      'Can learn dozens of words and phrases',
      'Mimic sounds and household noises',
      'Enjoy music and dancing',
      'Need toys to prevent boredom',
      'May bond more strongly with one person'
    ],
    funFacts: [
      'Budgies can move each eye independently',
      'They have over 3,000 feathers',
      'A budgie\'s cere (nose area) color indicates gender - blue for males, brown for females',
      'They can learn over 100 words',
      'Wild budgies are always green and yellow'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
      'https://images.unsplash.com/photo-1555169062-4686b8f7b5b7?w=400',
      'https://images.unsplash.com/photo-1581623880843-6b94c9d0c1b1?w=400',
      'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400'
    ]
  },

  // ==================== REPTILES ====================
  {
    id: 'bearded-dragon',
    category: 'reptiles',
    categoryName: 'Reptiles & Amphibians',
    name: 'Bearded Dragon',
    summary: 'Friendly, curious lizards known for their "beard" and calm disposition.',
    image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800',
    lifespan: '8-12 years',
    size: '18-24 inches',
    temperament: 'Docile, Curious, Friendly, Diurnal',
    difficulty: 'Moderate',
    habitat: [
      'Minimum 40-gallon tank for adult',
      'Basking spot (95-105°F)',
      'Cool side (75-85°F)',
      'UVB lighting essential (12 hours daily)',
      'Substrate: reptile carpet or tile',
      'Hides and climbing branches',
      'Digital thermometer and hygrometer'
    ],
    diet: [
      'Baby: 80% insects, 20% vegetables',
      'Adult: 20% insects, 80% vegetables',
      'Staple insects: crickets, dubia roaches',
      'Leafy greens: collard, mustard, turnip',
      'Vegetables: squash, bell peppers',
      'Calcium and vitamin supplements',
      'Fresh water daily'
    ],
    health: [
      'Metabolic bone disease (UVB essential)',
      'Impaction from improper substrate',
      'Respiratory infections',
      'Watch for parasites',
      'Shedding issues',
      'Annual vet check with reptile specialist'
    ],
    behavior: [
      'Wave and head bob for communication',
      'Beard darkens when stressed or threatened',
      'Bask under heat lamp',
      'Can recognize owners',
      'Enjoy being handled',
      'Brumate (hibernate) in winter'
    ],
    funFacts: [
      'Bearded dragons wave to show submission',
      'They can change color slightly for temperature regulation',
      'Their "beard" is actually spiky skin that puffs up',
      'They have a third eye (parietal eye) on top of head',
      'Can run on two legs when fast'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=400',
      'https://images.unsplash.com/photo-1559481828-9070fda1bcb9?w=400',
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=400',
      'https://images.unsplash.com/photo-1542445358-25df0f3750a6?w=400'
    ]
  },
  {
    id: 'leopard-gecko',
    category: 'reptiles',
    categoryName: 'Reptiles & Amphibians',
    name: 'Leopard Gecko',
    summary: 'Nocturnal lizards with spotted patterns, known for their smile and easy care.',
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800',
    lifespan: '15-20 years',
    size: '7-10 inches',
    temperament: 'Docile, Nocturnal, Curious, Solitary',
    difficulty: 'Easy',
    habitat: [
      'Minimum 20-gallon tank',
      'Warm side (88-92°F)',
      'Cool side (73-78°F)',
      'Under tank heater essential',
      '3+ hides (warm, cool, moist)',
      'Calcium sand or paper towel substrate',
      'Shallow water dish'
    ],
    diet: [
      'Live insects only',
      'Staple: mealworms, crickets, dubia roaches',
      'Feed every 2-3 days for adults',
      'Dust insects with calcium powder',
      'Calcium with D3 supplement weekly',
      'Fresh water always available'
    ],
    health: [
      'Metabolic bone disease (need calcium)',
      'Dysecdysis (shedding issues)',
      'Impaction from loose substrate',
      'Tail fat storage - health indicator',
      'Stomatitis (mouth rot)',
      'Find reptile veterinarian'
    ],
    behavior: [
      'Nocturnal - active at night',
      'Can drop tail when threatened (regrows)',
      'Lick eyes to clean them',
      'Store fat in tail',
      'Vocalize with squeaks when threatened',
      'Can be handled gently'
    ],
    funFacts: [
      'Leopard geckos have eyelids - most geckos don\'t',
      'They can detach their tail to escape predators',
      'Their toes have tiny hairs that let them climb smooth surfaces',
      'They come in hundreds of color morphs',
      'Females can store sperm for up to a year'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=400',
      'https://images.unsplash.com/photo-1600442697530-2b0a84e0e17b?w=400',
      'https://images.unsplash.com/photo-1559481828-9070fda1bcb9?w=400',
      'https://images.unsplash.com/photo-1542445358-25df0f3750a6?w=400'
    ]
  },

  // ==================== FISH ====================
  {
    id: 'betta',
    category: 'fish',
    categoryName: 'Fish & Aquatics',
    name: 'Betta Fish (Siamese Fighting Fish)',
    summary: 'Vibrant, labyrinth fish known for their flowing fins and bubble nests.',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
    lifespan: '2-4 years',
    size: '2.5-3 inches',
    temperament: 'Territorial, Intelligent, Curious',
    difficulty: 'Easy',
    habitat: [
      'Minimum 5-gallon tank (not bowl)',
      'Heated water 78-82°F',
      'Filtered with gentle flow',
      'Live or silk plants (plastic tears fins)',
      'Hiding spots',
      'Covered tank - they jump',
      'Weekly water changes (25%)'
    ],
    diet: [
      'High-protein pellets as staple',
      'Supplement with bloodworms, brine shrimp',
      'Feed 2-3 pellets twice daily',
      'Fast one day per week',
      'Remove uneaten food',
      'Avoid overfeeding - causes bloat'
    ],
    health: [
      'Fin rot from poor water quality',
      'Ich (white spot disease)',
      'Velvet (gold dust appearance)',
      'Swim bladder issues',
      'Popeye (eye swelling)',
      'Test water parameters regularly'
    ],
    behavior: [
      'Males fight - house separately',
      'Build bubble nests when happy',
      'Flare at reflections',
      'Can recognize owners',
      'Learn tricks like following finger',
      'May jump for food'
    ],
    funFacts: [
      'Bettas have a labyrinth organ to breathe air',
      'They can live in small puddles in the wild',
      'Males build bubble nests to attract females',
      'They change color as they age',
      'Domestic bettas are bred for vibrant colors and long fins'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400',
      'https://images.unsplash.com/photo-1611576303005-5e7d3f5f5b5a?w=400',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e3b1?w=400',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400'
    ]
  },

  // ==================== ARACHNIDS ====================
  {
    id: 'tarantula',
    category: 'arachnids',
    categoryName: 'Arachnids & Insects',
    name: 'Chilean Rose Tarantula',
    summary: 'Docile, long-lived spiders that are popular among exotic pet enthusiasts.',
    image: 'https://images.unsplash.com/photo-1545165375-1f744f6b711e?w=800',
    lifespan: 'Female: 15-20 years, Male: 5 years',
    size: '5-6 inches leg span',
    temperament: 'Docile, Skittish, Solitary',
    difficulty: 'Easy',
    habitat: [
      '5-10 gallon terrarium',
      'Coconut fiber or peat moss substrate',
      'Hide (cork bark or half-log)',
      'Shallow water dish',
      'Temperature 75-85°F',
      'Humidity 65-70%',
      'NO heat lamp (stress)'
    ],
    diet: [
      'Live crickets (2-3 weekly)',
      'Occasional roaches or mealworms',
      'Remove uneaten prey',
      'Prey size smaller than spider',
      'Fresh water always available',
      'Fast before molting'
    ],
    health: [
      'Dehydration - wrinkled abdomen',
      'Molt issues (need humidity)',
      'Mites from dirty enclosure',
      'Injuries from falls',
      'Parasites',
      'Find exotic vet for arachnids'
    ],
    behavior: [
      'Molting - lays on back (don\'t disturb)',
      'Kicks urticating hairs when threatened',
      'Webs enclosure for safety',
      'Mostly inactive during day',
      'Hunts at night',
      'Can be handled gently (but risky)'
    ],
    funFacts: [
      'Tarantulas regenerate lost legs during molts',
      'They have blue blood due to copper',
      'Females can live 3x longer than males',
      'They don\'t spin typical webs - use silk for lining',
      'Some species can live up to 30 years'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545165375-1f744f6b711e?w=400',
      'https://images.unsplash.com/photo-1581894158358-5e2e5e1e4b1a?w=400',
      'https://images.unsplash.com/photo-1581974267369-3f2fe3b4545c?w=400',
      'https://images.unsplash.com/photo-1594494857966-1d67f7b8dbb9?w=400'
    ]
  }
];

// Helper functions
export const getPetsByCategory = (categoryId: string): Pet[] => {
  return pets.filter(pet => pet.category === categoryId);
};

export const getPetById = (categoryId: string, petId: string): Pet | undefined => {
  return pets.find(pet => pet.category === categoryId && pet.id === petId);
};

export const searchPets = (query: string): Pet[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  if (!lowercaseQuery) return [];
  
  return pets.filter(pet => 
    pet.name.toLowerCase().includes(lowercaseQuery) ||
    pet.summary.toLowerCase().includes(lowercaseQuery) ||
    pet.temperament.toLowerCase().includes(lowercaseQuery) ||
    pet.categoryName.toLowerCase().includes(lowercaseQuery)
  );
};

export const getAllCategories = (): string[] => {
  const categories = new Set(pets.map(pet => pet.category));
  return Array.from(categories);
};

export const getCategoryName = (categoryId: string): string => {
  const pet = pets.find(p => p.category === categoryId);
  return pet ? pet.categoryName : categoryId;
};

export default pets;