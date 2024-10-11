
# Webtoon Backend API

This project is a simple RESTful API for managing a collection of Webtoons. It provides CRUD operations (Create, Read, Update, Delete) for Webtoon entries, with authentication and security using JWT and bcrypt for password hashing.It also has rate-limiting feature

## Features

- Fetch all webtoons
- Fetch a specific webtoon by ID
- Add a new webtoon
- Delete a specific webtoon
- JWT-based authentication for secure endpoints
 (ID is the QbjectId('') content assigned by mongodb th each entry ) 

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose for schema)
- JWT for authentication
- bcrypt for password hashing
- zod for verification 

## Getting Started

### Prerequisites

Before running this project, make sure you have:

- Node.js installed
- MongoDB installed and running locally or use a cloud instance (e.g., MongoDB Atlas)
- Also get a Cluster Ready to be used - get the cluster_connection_string 

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jahnvi9044/Webtoons.git

2. Navigate to the project directory:  
   ```bash
   cd Webtoons

3. Install the dependencies::  
   ```bash
   npm install

4. In the helper.js file in the root directory, change the following variables according to your needs :
   ```bash
    JWT_SECRET=your-secret-key
    MONGO_URI=your-mongodb-uri

5. Start the server:
    ```bash 
     npm run start

The server will run on http://localhost:3000

## API Endpoints

### Public Endpoints

* GET /webtoons: Fetch all webtoons
* GET /webtoons/:id: Fetch a specific webtoon by its ID
 (ID is the QbjectId('') content assigned by mongodb th each entry ) 

### Protected Endpoints (require JWT authentication)

* POST /signup: Create a new user (Sign up)
* POST /signin: Sign in a user and return a JWT token
* POST /webtoons: Add a new webtoon (Requires JWT)
* DELETE /webtoons/:id: Delete a webtoon (Requires JWT)
(ID is the QbjectId('') content assigned by mongodb th each entry ) 
## Example Usage

#### Signup:

    
      POST /signup
      {
       "username": "testuser",
       "password": "password123",
       "confirm_passwrod":"password123"
       }



#### Signin (get JWT token):

     POST /signin
     {
       "username": "testuser",
       "password": "password123"
     }


#### Response 
   
     {
      "token": "your-jwt-token"
     }
#### Adding a Webtoon (Authenticated Request):
    
    POST /webtoons
    {
     "title": "Castle Swimmer",
     "summary": "A story about...",
     "characters": "Character 1"
     }

#### Include JWT token in the Authorization header:
    
      Authorization: Bearer your-jwt-token


---


This will make it easy for anyone cloning the repository to understand how to install, run, and use your Webtoon backend API.

Do you need help with any specific sections?
