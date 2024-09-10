
# Next.js RESTful API's

Develop **CRUD** for `users`, `categories` and `blogs`  with Next.js Application


## Installation

Install `node.js` latest version and `postman` for run RESTful API's 


### Run Locally

Clone the project

```bash
  git clone https://github.com/MalikAqeelArshad/next-restfulapis.git
```

Go to the project directory

```bash
  cd next-restfulapis
```

Install dependencies

```bash
  npm install
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_MONGODB_URI`

Start the server

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## API Reference

#### Get all users

```http
  GET /api/users
```

#### Create new user

```http
  POST /api/users
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `name` `email` `password` | `string` | **Required** |

#### Update user

```http
  PUT /api/users
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `_id` `name` | `string` | **Required** |
| `email`      | `string` | **Unique** *Optional* |

#### Delete user

```http
  DELETE /api/users
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `string` | **Required** |

#### Get all categories by user

```http
  GET /api/categories?userId=add_user_id_here
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |

#### Create new category

```http
  POST /api/categories
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `title` `userId` | `string` | **Required** |

#### GET single category

```http
  PATCH /api/categories/:id
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |

#### Update category

```http
  PUT /api/categories/:id
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `title` `userId` | `string` | **Required** |

#### Delete category

```http
  DELETE /api/categories/:id
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |

#### Get all blogs by user and category

```http
  GET /api/blogs?userId=add_user_id_here&categoryId=add_category_id_here
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `userId` `categoryId` | `string` | **Required** |

#### Create new blog

```http
  POST /api/blogs
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `title` `userId` `categoryId` | `string` | **Required** |
| `description` | `string` | *Optional* |

#### GET single blog

```http
  PATCH /api/blogs/:id
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `userId` `categoryId` | `string` | **Required** |

#### Update blog

```http
  PUT /api/blogs/:id
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `title` `userId` `categoryId` | `string` | **Required** |
| `description` | `string` | *Optional* |

#### Delete blog

```http
  DELETE /api/blogs/:id
```

| Body Parameters | Type     | Description                 |
| :-------- | :------- | :-------------------------------- |
| `userId` `categoryId` | `string` | **Required** |


#### Filters

```http
  GET /api/blogs?page=1,limit=10,keywords=search_keywords,startDate=2024-09-09,endDate=2024-09-10
```
## 🚀 About Me
I’m graduated in BSCS (hons) with specialization in Software Engineering and currently hold more than 10 
years of experience in multiple fields of Graphics, Webs, SEO, Mobile apps and other relevant IT aspects.  

I'm creative front-end and back-end developer for building interactive mobile and custom web apps including mobile responsive websites and e-commerce products. 

I have a very strong technical background in the IT area and excellent commands over CSS, JavaScript, NextJS, NuxtJS, VueJS, ReactJS/Native, InertiaJS, Laravel, NodeJS, Git and Mobile Apps Development.

If you face any difficulty, please contact me: `+971569369306` or email `malik.aqeelarshad@gmail.com`

