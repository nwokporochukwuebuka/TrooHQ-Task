# RESTful Role Based Access Control (RBAC) System

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

## Quick Start

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

### Clone the repo:

```bash
git clone --depth 1 https://github.com/nwokporochukwuebuka/TrooHQ-Task.git
cd troohq-task
npx rimraf ./.git
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Task](#task)
- [Solution](#solution)

## Task

Troo Backend Case Study Task

Shoprite has recorded a decline in sales per day in the last year. Audit has shown that the source of the decline is the customer checkout software adopted and have contracted you to build a custom inventory and checkout software for to be adopted in the coming months. Let’s call this software Project X.

Project X is a sass software that helps marketplace enterprises to handle checkout. A unique feature of project X is its multi-user functionality which has allowed every department access and update inventory without delay. Roles are assigned to users and permissions assigned to each role so users are able to be able to execute different tasks depending on the permission assigned to their roles.

The software will have a super admin(the business owner) who will be able to create new users, assign the new users to their roles with one or more permissions.
NB:

1.  A user can only have one role.
2.  One role can have more than one or more permission(s)

Your task

1. Sketch the ERDs that perfectly explains the multi-user system of the software showing the relationship between the user, role and permissions table( use dbdiagram.io)
2. Write a register endpoint for super admin (business owner). Input data
   1. Fullname
   2. Company Name
   3. Email
   4. Password
3. Write an endpoint with which the super admin can add more users
   1. Fullname
   2. Email
4. Write a login endpoint for all the user types.

Tools

1. Database: PostgreSQL/MongoDB
2. Technology: NodeJS, Flask or Django(python)
3. Version control: Github

Further Instructions

1. Push your task to a GitHub repo and share the repo link
2. Document all the endpoints in the README file of your repo
3. Complete the task in 48 hours

## Solution

1. ERD Diagram
   ![ERD Diagram](/images/erd.png)

2. API Documentation

   #### User

   ### Register Company

   **Request**
   This endpoint registers both staff and company (super admin)

   ![Request](/images/register_company.png)

   **Response**

   This is the response of the API

   ![Request](/images/register-success.png)

   ### Register Staff

   **Request**
   This endpoint registers both staff and company (super admin)

   ![Request](/images/request-register-staff.png)

   **Response**

   This is the response of the API

   ![Request](/images/register-staff-success.png)

   ### Superadmin Create User

   **Scenario One: Using an already existing role**
   **Request**
   This endpoint uses and already existing roleId when creating the user
   ![Create User using existing role](/images/create-user-1.png)

   **Response**

   This is the response of the API
   ![Response of creating a new user using an already existing role](/images/response-already-createdd-role.png)

   **Scenario Two: Using a new role**
   **Request**
   This endpoint created a new role while creating the user as specified by the superadmin
   ![Create User using existing role](/images/request-with-new-role.png)

   **Response**

   This is the response of the API
   ![Response of creating a new user using an already existing role](/images/response-new%20role.png)

   ### Login User of all Types

   #### SuperAdmin Login

   **Request**
   ![Login Company](/images/login-company.png)

   **Response**
   ![Login Response](/images/login-company-response.png)

   #### Staff Login

   **Request**
   ![Login Request Staff](/images/login-request-staff.png)

   **Response**
   ![Login Response Staff](/images/login-staff-response.png)

Other endpoints can be located in the `./request.rest` file and can be tested

## License

[MIT](LICENSE)
