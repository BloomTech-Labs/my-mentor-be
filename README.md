
# API Documentation

#### 1️⃣ Backend deployed at [mentor-be](https://mentor-be.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### Backend framework

-    Node/Express
-    Point Two
-    Point Three
-    Point Four

## 2️⃣ Endpoints


#### Mentor Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/mentor/`          | all users      | Returns all mentors                          |
| GET    | `/api/mentor/:mentorId` | all users      | Returns a single mentor by Id                |
| PUT    | `/api/mentor/:mentorId` | user           | Modify an existing mentor by ID.             |
| DELETE | `/api/mentor/:mentorId` | user           | Deletes everything dependent on the mentor   |

#### Mentor Posts Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/mentor/posts/all` | users          | Returns all mentors' posts                   |
| GET    | `/api/mentor/:mentorId/posts` | users    | Returns a mentors' post                      |
| POST   | `/api/mentor/:mentorId/posts` | users    | Adds a mentors' post                         |
| PUT    | `/api/mentor/:mentorId/posts/:pid`| user | Modify an existing mentors' post             |
| DELETE | `/api/mentor/:mentorId/posts/:pid` | user    | Deletes mentors' post                    |

#### Mentee Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/api/mentee/`          | all users           | Returns all mentees                                |
| GET    | `/api/mentee/:menteeId` | all users           | Returns a single mentee by ID                      |
| PUT    | `/api/mentee/:menteeId` | user                | Modify an existing mentee by ID                    |
| DELETE | `/api/mentee/:menteeId` | user                | Deletes everything dependent on the mentee         |

#### Mentee Posts Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/mentee/posts/all` | users          | Returns all mentees' posts                   |
| GET    | `/api/mentee/:menteeId/posts` | users    | Returns a mentees' post                      |
| POST   | `/api/mentee/:menteeId/posts` | users    | Adds a mentees' post                         |
| PUT    | `/api/mentee/:menteeId/posts/:pid`| user | Modify an existing mentees' post             |
| DELETE | `/api/mentee/:menteeId/posts/:pid` | user    | Deletes mentees' post                    |

#### Auth Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/api/register/mentor`  | user                | Register a new Mentor in db        
| POST   | `/api/login/mentor`     | user          |     |   Login for Mentor                     
| POST   | `/api/register/mentee`  | user                | Creates a new mentee by ID                         |
| POST   | `/api/login/mentee`     | user                |      Login for Mentee                   | user                |

# Data Model

#### MENTORS

---

```
{
  id: UUID
  first_name: STRING
  last_name: STRING
  city: STRING
  state: STRING
  profession: STRING
  image: STRING
  description: STRING
  email: STRING
  password: STRING
}
```

#### MENTOR POSTS

---

```
{
  id: UUID
  mentor_id: ID
  image: STRING
  description: STRING
}
```

#### MENTEES

---

```
{
  id: UUID
  first_name: STRING
  last_name: STRING
  city: STRING
  state: STRING
  title: STRING
  image: STRING
  description: STRING
  email: STRING
  password: STRING
}
```
#### MENTOR POSTS

---

```
{
  id: UUID
  mentor_id: ID
  image: STRING
  description: STRING
}
```

## 2️⃣ Actions


`getMentors()` -> Returns all mentors

`getMentor(mentorId)` -> Returns a single mentor by mentor ID

`addMentor(user object)` -> Creates a new mentor and returns the user

`updateMentor(mentorId, changes object)` -> Update a single mentor by ID

`deleteMentor(mentorId)` -> Deletes everything dependent on the mentor

`findMentor` -> Filters thru Mentor database and logs in user with correct email and password
<br>
<br>
<br>

`getMentees()` -> Returns all mentees

`getMentee(mentorId)` -> Returns a single mentee by mentee ID

`addMentee(user object)` -> Creates a new mentee and returns the user

`updateMentee(menteeId, changes object)` -> Update a single mentee by ID

`deleteMentee(menteeId)` -> Deletes everything dependent on the mentee

`findMentee` -> Filters thru Mentee database and logs in user with correct email and password

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
    
    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/my-mentor-fe/blob/master/README.md) for details on the frontend of our project.

