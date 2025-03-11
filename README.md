# Application Setup and Run Instructions (Local Development)

This document provides instructions for setting up and running the application locally, without using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js:** (Version 20 or higher recommended) - [Download Node.js](https://nodejs.org/)
- **npm:** (Usually installed with Node.js)
- **Redis Server:** (Running locally on the default port 6379) - [Download Redis](https://redis.io/download/)

## Installation

1.  **Clone the Repository:**

    ```bash
    git clone <your_repository_url>
    cd <your_repository_directory>
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Create `.env` File:**

    - Create a `.env` file in the root directory of your project.
    - Add the following environment variables:

    ```
    PORT=3000
    REDIS_URL=redis://localhost:6379
    ```

## Running the Application

1.  **Start Redis Server:**

    - Open a terminal and start your Redis server. The command may vary depending on your operating system.
    - On most Linux/macOS systems, you can run:
      ```bash
      redis-server
      ```

2.  **Start the Application Server:**

    - Open a new terminal and navigate to your project directory.
    - Run the application server using:
      ```bash
      npm start
      ```
    - Or, for development with automatic restarts on file changes, use:
      ```bash
      npm run dev
      ```

3.  **Start the Worker:**
    - Open another terminal and navigate to your project directory.
    - Run the worker process using:
      ```bash
      node src/worker.js
      ```

## Testing the Application

1.  **Submit a Job:**

    - Use a tool like Postman or curl to send a POST request to `http://localhost:3000/api/submit` with a JSON payload:

    ```json
    {
        "count": 1,
        "visits": [
            {
                "store_id": "S00339218",
                "image_url": [
                    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
                ],
                "visit_time": "2025-03-10T10:00:00Z"
            }
        ]
    }
    ```

2.  **Check Job Status:**

    - Use a GET request to `http://localhost:3000/api/status?jobid=<job_id>` (replace `<job_id>` with the actual job ID from the previous step).

3.  **Monitor Logs:**
    - Check the terminal windows where you started the application server and the worker process for any logs or errors.

## Troubleshooting

- **Redis Connection Issues:**
  - Ensure that your Redis server is running on `localhost:6379`.
  - Verify that the `REDIS_URL` in your `.env` file is correct.
- **Dependency Issues:**
  - If you encounter issues with missing dependencies, try deleting your `node_modules` folder and running `npm install` again.
- **Port Conflicts:**
  - If port 3000 is already in use, change the `PORT` variable in your `.env` file.
- **Worker not processing jobs:**
  - Verify the redis server is running.
  - Verify the worker.js file is running.
  - Verify the worker.js file is able to connect to the redis server.
