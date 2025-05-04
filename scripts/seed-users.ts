import { PrismaClient } from '@prisma/generated';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

// Initialize Prisma client
const prisma = new PrismaClient();

// Constants
const SALT_ROUNDS = 12;
const NUM_USERS = 100;
const DEFAULT_PASSWORD = 'password';

// Gender types
const GENDERS = ['male', 'female'];

// Regions
const REGIONS = [
  'North America', 'South America', 'Europe', 'Asia', 'Africa', 
  'Australia', 'Antarctica', 'Middle East', 'Caribbean', 'Pacific Islands'
];

// Interests
const INTERESTS = [
  'Reading', 'Writing', 'Coding', 'Gaming', 'Sports', 
  'Music', 'Movies', 'Traveling', 'Cooking', 'Photography',
  'Hiking', 'Swimming', 'Dancing', 'Painting', 'Gardening'
];

/**
 * Generate a random username that follows the pattern:
 * - Starts with a letter or number
 * - Middle can contain letters, numbers, underscores, or hyphens
 * - Ends with a letter or number
 */
function generateUsername(index: number): string {
  const prefix = faker.internet.userName().replace(/[^a-zA-Z0-9_-]/g, '');
  // Ensure it starts and ends with alphanumeric characters
  return `user${index}_${prefix}`.replace(/^[^a-zA-Z0-9]|[^a-zA-Z0-9]$/g, 'a');
}

/**
 * Generate a random array of interests
 */
function generateInterests(): string {
  const numInterests = faker.number.int({ min: 1, max: 5 });
  const userInterests = new Set<string>();
  
  for (let i = 0; i < numInterests; i++) {
    userInterests.add(INTERESTS[faker.number.int({ min: 0, max: INTERESTS.length - 1 })]);
  }
  
  return Array.from(userInterests).join(', ');
}

/**
 * Main seeding function
 */
async function seedUsers() {
  console.log('Starting to seed users...');
  
  // Hash the default password once
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS);
  
  // Create users in batches to avoid overwhelming the database
  const BATCH_SIZE = 10;
  const batches = Math.ceil(NUM_USERS / BATCH_SIZE);
  
  for (let batchIndex = 0; batchIndex < batches; batchIndex++) {
    const start = batchIndex * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, NUM_USERS);
    const userBatch = [];
    
    for (let i = start; i < end; i++) {
      const username = generateUsername(i + 1);
      const gender = GENDERS[faker.number.int({ min: 0, max: GENDERS.length - 1 })];
      const age = faker.number.int({ min: 18, max: 80 });
      const region = REGIONS[faker.number.int({ min: 0, max: REGIONS.length - 1 })];
      const interests = generateInterests();
      const about_me = faker.lorem.paragraphs({ min: 1, max: 3 }).substring(0, 200);
      const status_message = faker.lorem.sentence().substring(0, 200);
      const name = faker.person.fullName();
      const active_now = faker.datatype.boolean(0.2); // 20% chance of being active
      
      userBatch.push({
        username,
        password: hashedPassword,
        gender,
        age,
        region,
        interests,
        about_me,
        status_message,
        name,
        active_now,
        profile: null // No profile picture for seeded users
      });
    }
    
    // Create users in the current batch
    await prisma.user.createMany({
      data: userBatch,
      skipDuplicates: true, // Skip if username already exists
    });
    
    console.log(`Seeded users ${start + 1} to ${end}`);
  }
  
  const userCount = await prisma.user.count();
  console.log(`Seeding completed. Total users in database: ${userCount}`);
}

// Run the seeding function
seedUsers()
  .catch((error) => {
    console.error('Error seeding users:', error);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma client connection
    await prisma.$disconnect();
  });
