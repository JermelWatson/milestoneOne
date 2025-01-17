# University Course Portal

## Overview
The **University Course Portal** is a web-based platform designed to streamline course management and facilitate communication between students, faculty, and administrators. It aims to create a cohesive system where:
- **Students** can view courses, track academic progress, and access materials.
- **Faculty** can manage courses, upload materials, and assess students.
- **Administrators** can oversee student and faculty profiles, ensuring smooth operations and coordination.

## Features
- **Student Portal:** Track academic progress, view enrolled courses, and access learning materials.
- **Faculty Dashboard:** Manage courses, upload materials, and grade students.
- **Administrator Control:** Manage both student and faculty data, ensuring system consistency.

## Architecture
Below is the high-level system architecture of the University Course Portal. It illustrates the flow of data between the frontend, backend, and database:

![System Architecture](https://github.com/JermelWatson/milestoneOne/blob/main/archtecture.jpg)

### Key Components
1. **Frontend (React)**: Handles the user interface and interacts with the backend through API calls.
2. **Backend (Node.js + Express)**: Manages application logic, API endpoints, and data processing.
3. **Database (MySQL)**: Stores all relational data, including user profiles, courses, and grades.
4. **Hosting Services**:
   - Frontend: Hosted on Firebase.
   - Backend and Database: Hosted on Clever Cloud.

## Technologies, Methods, and Frameworks Used

### **Frontend**
- **React:** Used to create an interactive and dynamic user interface with reusable, component-based architecture.
  - Views are dynamically rendered based on user roles and interactions.
  - Deployment: [Firebase](https://milestonetwo-6ec19.web.app/dashboard)

### **Backend**
- **Node.js:** Selected for its asynchronous, non-blocking nature to handle multiple requests efficiently.
- **Express:** A lightweight framework used for routing and building API endpoints to connect the frontend and database.
  - Deployment: Clever Cloud ([Backend URL](be4fmkjwckpdzvd4lgrh-mysql.services.clever-cloud.com))

### **Database**
- **MySQL:** Used for data storage, relational data handling, and validation (e.g., user profiles, courses, and grades).
- **PHPMyAdmin:** Interfaces directly with the MySQL database for efficient management.
- **PHP:** Facilitates interaction between the backend and the MySQL database.

### **Additional Tools and Methods**
- **Vite:** Provides a lightweight development server and optimized build process.
- **JavaScript (ES6+):** Adds interactivity, logic, and manages asynchronous API requests between the client and server.

## Deployment
- **Frontend:** Hosted on Firebase at [https://milestonetwo-6ec19.web.app/dashboard](https://milestonetwo-6ec19.web.app/dashboard)
- **Backend:** Hosted on Clever Cloud at [Backend URL](be4fmkjwckpdzvd4lgrh-mysql.services.clever-cloud.com)

## Conclusion
The University Course Portal offers an efficient, user-friendly solution for course management, providing a seamless experience for students, faculty, and administrators.
