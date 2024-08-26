### **Steps to Clone and Set Up on Local Environment**

1. **Clone the Repository**
   - Open your terminal and clone the repository using:
     ```bash
     git clone https://github.com/Redis-FinTarget.git
     ```
   - Navigate into the project directory:
     ```bash
     cd Redis-FinTarget
     ```

2. **Install Dependencies**
   - Navigate to the backend directory and install dependencies:
     ```bash

     cd backend

     copy .env.sample   to  .env

     npm install

     tsc -b 

     node dist/server.js

     ```
   - Navigate to the frontend directory and install dependencies:
     ```bash
     cd ../frontend

     npm install

     npm run dev  
 
 
   - The frontend will usually run on `http://localhost:3000` and the backend on `http://localhost:8000` (or whichever ports you have configured).

---

### **Docker Way to Run Backend and Frontend with One Command**

To run both the backend and frontend servers using Docker, you can use Docker Compose. This allows you to define and manage multi-container Docker applications.
 
1. **Build and Run the Containers**

   - Use the following command to build the Docker images and start the containers:

     ```bash
     docker-compose up --build
     ```

   - The `--build` flag forces Docker to rebuild the images if there are any changes to the Dockerfiles.
   - The `docker-compose up` command:
     - Builds the images based on the `Dockerfile` for each service (if they haven't been built yet).
     - Creates and starts the containers for each service.
     - Runs the frontend and backend simultaneously with the linked Redis service.

4. **Access the Application**

   - Once the command completes, your frontend will be running at `http://localhost:3000` and your backend at `http://localhost:8000` (or whichever ports you have configured).
   - You can stop the running containers by pressing `CTRL + C` in the terminal.
   - To stop and remove the containers, networks, and volumes created by `docker-compose up`, run:

     ```bash
     docker-compose down
     ```

Using Docker and Docker Compose simplifies the process of running your application, ensuring consistency across different environments and making it easier for others to set up and run your project.