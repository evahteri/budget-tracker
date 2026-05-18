# Budget Tracker

Budget Tracker is a web application which allows the user to track personal finances and get valuable insights from their spending.

## Documentation

[Timesheet](https://github.com/evahteri/budget-tracker/blob/main/documentation/TIMESHEET.md)

## Local development

1. Install dependencies from both /backend and /frontend directories `npm install`
2. Run backend server in /backend directory `node index.js`
3. Run frontend in /frontend/budget-tracker directory `npm run dev`
4. Open application in `http://localhost:5173/`

## Local development (using Docker)

1. Run `docker compose -f docker-compose.dev.yml build`
2. Run `docker compose -f docker-compose.dev.yml up`
3. Navigate to `http://localhost:8080/`

## Prod setup

1. Run `docker compose build`
2. Run `docker compose up`
3. Navigate to `http://localhost:8080/`