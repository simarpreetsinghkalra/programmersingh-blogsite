# @programmersingh | RESTful Blog App

A demo for usage of RESTful Routes (for blogs) in Expressjs using TypeScript

## Routes Covered

|NAME           |PATH           |METHOD         |PURPOSE                                        |
|---------------|---------------|---------------|-----------------------------------------------|
|Index          |/blogs         |GET            |List all blogs                                 |
|New            |/blogs/new     |GET            |Show new blog form                             |
|Create         |/blogs         |POST           |Create a new blogs, redirect to index          |
|Show           |/blogs/:id     |GET            |Show info about specific blog                  |
|Edit           |/blogs/:id/edit|GET            |Show prefilled edit form for one blog          |
|Update         |/blogs/id      |PUT            |Update particular blog, redirect to show route |
|Destroy        |/blogs/:id     |DELETE         |Delete particular blog, redirect to index      |

## Steps to run

To run this project follow these steps:
1. Run MongoDB.
2. Clone this repository.
3. Navigate to the root directory of the repository in terminal / command-prompt / powershell.
4. Run command `npm i`.
5. Run command `npm start`
6. If you want to make changes in the design or views, all the views / stylesheets / icons are in _build_ directory.
7. If you want to make changes in the JavaScript, all the **.ts** files are in _src_ directory. Make sure to run command `npm run tsc` after making changes to **.ts** files. Then run command `npm start`.
8. You always need to compile and restart the node server after changing **.ts** files.
