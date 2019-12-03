### Bluecrew Coding Project

Congratulations on moving forward in the Bluecrew interview process! We’ve enjoyed our conversations with you and think you would make a good fit on our team! The next part of our interview process is a small coding project. We like to do this for a few reasons. One, it gives candidates an opportunity to work with the different frameworks and languages we have in our tech stack and, secondly, it gives candidates the ability to showcase their problem solving skills. We are excited to see what you can do and if you have any questions on the project below, please feel free to reach out.

*Objective:*  Create a simple application to query cats


#### Requirements

-Must use node.js

-Must have the endpoints listed below

-Must have a simple AngularJS app to access / display results from the listed endpoints

#### Bonus:

-Use MySQL database and query with raw SQL in endpoints

-Deploy via AWS’s Elastic Beanstalk or ECS

#### Deliverable:

Please send the codebase and a publically available URL to test the endpoints.

#### Endpoints<

(types followed by a ? are nullable)

**/cat/register**

Header: browser info

Body:



*   birthdate:Date?
*   breed: String?
*   imageUrl: String?
*   name: String
*   password: String 
*   username: String 
*   weight: Float

 

Save the cat in a database:



*   addedAt: Date
*   breed: String?
*   birthdate:Date?
*   id: Int
*   imageUrl: String?
*   lastSeenAt: Date
*   name: String
*   password: String 
*   username: String 
*   weight: Float

Returns: nothing

Errors: 



*   name missing
*   username invalid
*   password < 8 characters

**/cat/login**

Header: browser info

Body: 



*   username: String
*   password: String

Update the database:



*   lastSeenAt: Date \


Returns: authToken: String

Errors:



*   no such username
*   password incorrect \


**/cats**

Header: authToken, browser info

Body: (optional search fields)



*   id: String?
*   name: String?
*   username: String?

Returns: array of cats (birthdate: Date, breed: String, username: String, id: int , imageUrl: String?, name: String) matching that criteria, sorted by lastSeenAt. 

Errors:



*   authToken invalid 
*   invalid search criteria

**/cats/random **

Body: empty

Returns: imageUrl: String, name: String, and breed: String for a random cat


<!-- Docs to Markdown version 1.0β17 -->

