# Exercise Tracker

Build a full stack JavaScript application that allows users to log exercises, view their exercise history, and track their progress over time, similar to the FreeCodeCamp Exercise Tracker project.

## Features

- **Exercise Logging:**
  - Users can log exercises with details such as description, duration, and date.
  
- **User Management:**
  - User registration and management including update and delete operations.
  
- **Exercise History:**
  - Retrieve a user's exercise log history and track their progress.
  
- **UI/UX:**
  - Responsive and intuitive user interface for seamless user experience.

## Data Structures

### Exercise

```json
{
  "username": "fcc_test",
  "description": "test",
  "duration": 60,
  "date": "Mon Jan 01 1990",
  "_id": "5fb5853f734231456ccb3b05"
}
```

### User

```json
{
  "username": "fcc_test",
  "_id": "5fb5853f734231456ccb3b05"
}
```

### Exercise Log

```json
{
  "username": "fcc_test",
  "count": 1,
  "_id": "5fb5853f734231456ccb3b05",
  "log": [{
    "description": "test",
    "duration": 60,
    "date": "Mon Jan 01 1990"
  }]
}
```

## Tech Stack

- **Frontend:** HTML, CSS (Bootstrap recommended), JavaScript (React or plain JS)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (for storing users and exercise logs)

## Acknowledgements

- Built with guidance from the FreeCodeCamp Exercise Tracker project.
- Inspiration and learning resources from the FreeCodeCamp community.


---
This is the project for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
