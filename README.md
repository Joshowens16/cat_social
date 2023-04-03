# Cat Social
**An Instgram site for cat owners**

![Login Page](https://user-images.githubusercontent.com/79232977/228133449-7dbe6e85-8b13-44a6-944f-dffacd04d677.png)
  Cat social is a full stack TypeScript application that uses React on the front-end and Express on the back-end with a PostgreSQL database.
# Tech Stack
## Front-end
  - TypeScript
  - React
  - Redux
  - Tailwind CSS
## Back-end
  - TypeScript
  - Node
  - Express
  - PostgreSQL
  - Prisma (ORM)
  
# Project Goals
## Tier 1
- A user should be able to create an account and login.
- A user should be able to post content (images).
  - A user should also be able to update and delete their own post history
- A user should be able to view their friends posts.
- A user should be able to like and comment on other users posts.
  - A user should also be able to unlike and delete/edit their comments on other posts.
- Cat Social should be tablet and mobile friendly.
- A user should be able to search for other users.

## Tier 2
- A user should be able to message other users.
  - Messages should populate without page refresh.
- A user should be able to like/unlike other users comments.
- A user can posts "stories" that last for 24 hours by default.
  - A user can delete their stories before the 24 hour period.

## Tier 3
- A user should be able to interact with other users stories.
  - Comment/like other users stories.
  
# Database Schemas
## V1![drawSQL-cat-social-export-2023-03-19](https://user-images.githubusercontent.com/79232977/226156711-8004162d-6b4f-4394-bb6c-2d04c2926c7b.png)

# Project Process:
Tier 1: API/DATABASE
- [x] API can now interact with local and deployed database to create new users
- [x] Authenticate users and hash/encrpt sensitive user information (primarily user password)
- [x] User can Follow and Unfollower users (in the backend)

Current ticket being tackled:
Users need to be able to post images
  - For this I will be using an AWS S3 Bucket, which will interact with the psql database.
Once users can post images, the logic for users seeing other useres posts needs to be tackled.
  - Initially, this will be tackled chronologically and be paginated in the backend to limit backend stress.
  
