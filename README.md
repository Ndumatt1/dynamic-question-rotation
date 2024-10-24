# Question Rotation System

## Introduction

This project is designed to manage questions assigned to specific regions.
The core functionality revolves around a **Question** entity that can be assigned to various regions based on a scheduling mechanism. The primary goal is to efficiently manage and update the questions assigned to different regions while ensuring that all updates are tracked and persisted in a PostgreSQL database.

## Architecture Overview

The project is built using **NestJS**, a progressive Node.js framework, alongside **TypeORM** for database interactions. The main components of the architecture include:

- **Entities**: `Question` and `RegionQuestion`, where `RegionQuestion` acts as a junction to establish a many-to-one relationship with `Question` And stores the current question of a region until the next cycle.
- **Services**:
  - `QuestionService`: Manages operations related to questions, including assignment to regions.
  - `SchedulerService`: Handles the scheduling of tasks using cron jobs.
- **Database**: A PostgreSQL database stores all questions and their associated regions.

## Design Strategy

### Core Features

- **Dynamic Question Assignment**: Questions can be assigned to multiple regions dynamically, with updates being saved in real-time.
- **Scheduled Task Management**: Using cron jobs, the system can periodically update assignments, allowing for flexibility in managing question distribution. the `CYCLE` environment variable defines the interval in which the job is run. Defaults to 7 days
- **Eager Loading of Relationships**: The use of eager loading ensures that related entities are fetched along with the main entity, reducing the need for multiple database queries.

### Pros and Cons

#### Pros

1. **Modularity**: The separation of concerns through distinct services and entities enhances maintainability and testability.
2. **Scalability**: The design can easily accommodate new features, such as adding additional entities or modifying scheduling logic without extensive refactoring. `CYCLE` environment variable defines the duration for each cycle making it scalable and easily configured.
3. **Real-time Updates**: Changes to questions and assignments are reflected immediately, providing a seamless user experience.
4. **Robust Error Handling**: Incorporating error handling mechanisms ensures that issues during database operations are gracefully managed, enhancing application reliability.

#### Cons

1. **Complexity in Relationships**: The many-to-one relationship between `Question` and `RegionQuestion` adds complexity, requiring careful management of foreign keys and ensuring data integrity.
2. **Region entity is not defined**: The use of an array to hold the available regions isn't the most optimal. A separate entity for the region is needed
3. **Lack of Redis**: Implementing redis will significantly improve the system. region specific questions can be store in memory `Redis` for the specified duration after which it is expired. This can be set up in the scheduler service each time it runs based on the `CYCLE` defined in environment variable.

## Implementation Details

### Setting Up the Environment

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:

   ```yarn install

   ```

3. Set environments variable
   ```CYCLE=<number-of-days-for-cycle-duration>
   DATABASE_URL=
   ```
4. Start the server

   ```yarn start

   ```
