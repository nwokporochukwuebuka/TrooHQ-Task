# RESTful Role Based Access Control (RBAC) System

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

## Quick Start

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

### Clone the repo:

```bash
git clone --depth 1 https://github.com/nwokporochukwuebuka/TrooHQ-Task.git

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
   ![erd](https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/cb4bfbdc-a828-4ef9-bdff-b771fbcbe5e8)

2. API Documentation

   #### User

   ### Register Company

   **Request**
   This endpoint registers both staff and company (super admin)

   <img width="486" alt="register_company" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/1b8c6424-51d4-4c04-88ee-ecd867d90206">

   **Response**

   This is the response of the API

   <img width="733" alt="register-success" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/fb7d1d66-1cc4-4e6f-b3be-9b262ed8f71f">

   ### Register Staff

   **Request**
   This endpoint registers both staff and company (super admin)

   <img width="515" alt="request-register-staff" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/c6c2d760-0b15-4c8a-9b6d-5cbe4ffe0b4b">

   **Response**

   This is the response of the API

   <img width="776" alt="register-staff-success" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/521431c1-916d-4641-a3e0-3a834b7de909">

   ### Superadmin Create User

   **Scenario One: Using an already existing role**
   **Request**
   This endpoint uses and already existing roleId when creating the user
   <img width="584" alt="create-user-1" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/5083093c-97ef-4f04-856c-dbaafbddd8d3">

   **Response**

   This is the response of the API
   <img width="744" alt="response-already-createdd-role" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/b6f94d7b-acc2-4468-8fe1-76d218619cc1">

   **Scenario Two: Using a new role**
   **Request**
   This endpoint created a new role while creating the user as specified by the superadmin
   <img width="568" alt="request-with-new-role" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/f5b2b25f-02fd-4761-bd2e-cbb0012447e5">

   **Response**

   This is the response of the API
   <img width="688" alt="response-new role" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/15565bb7-4c6e-4f64-be85-3a1451050537">

   ### Login User of all Types

   #### SuperAdmin Login

   **Request**
   <img width="570" alt="login-company" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/60ce160c-bd43-4c51-a7a0-c60999222171">

   **Response**
   <img width="733" alt="login-company-response" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/8a71db0c-f760-4660-bd96-6b282108f238">

   #### Staff Login

   **Request**
   <img width="574" alt="login-request-staff" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/a4520ef5-f46d-4c03-b78d-04ec17845afe">

   **Response**
   <img width="753" alt="login-staff-response" src="https://github.com/nwokporochukwuebuka/TrooHQ-Task/assets/55829039/aa2f375a-ab14-4c7a-bccb-9964d954491e">

Other endpoints can be located in the `./request.rest` file and can be tested

## License

[MIT](LICENSE)
