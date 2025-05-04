# Database Seeder Scripts

This directory contains scripts for seeding the database with test data.

## User Seeder

The `seed-users.ts` script creates 100 random users in the database. All users have the password "password" (hashed).

### How to Run

Before running the seeder, make sure you have installed the required dependencies:

```bash
npm install
```

Then run the seeder with:

```bash
npm run seed:users
```

### Generated Data

The seeder generates users with the following attributes:

- **username**: Unique username following the pattern `user{index}_{random}`
- **password**: All users have the password "password" (properly hashed)
- **gender**: Either "male" or "female"
- **age**: Random age between 18 and 80
- **region**: Random region from a predefined list
- **interests**: Random selection of 1-5 interests from a predefined list
- **about_me**: Random lorem ipsum text up to 200 characters
- **status_message**: Random lorem ipsum sentence up to 200 characters
- **name**: Random full name
- **active_now**: Boolean with 20% chance of being true
- **profile**: Null (no profile picture)

### Notes

- The script uses batch processing to avoid overwhelming the database
- Duplicate usernames are skipped
- The script will log progress and the final count of users in the database
