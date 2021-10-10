# InternFinder

A webapp to host internship job posts in Bangladesh.

## Screenshots

![1](https://user-images.githubusercontent.com/46298019/136704368-2a698309-e649-4167-9e99-3985b77ada08.PNG)
![2](https://user-images.githubusercontent.com/46298019/136704370-b5f0144c-1696-495d-ba4c-93db54370bd3.PNG)
![4](https://user-images.githubusercontent.com/46298019/136704373-3ae88934-8fc1-4eec-a77c-03130e4a82c6.PNG)
![90](https://user-images.githubusercontent.com/46298019/136704378-287eef3e-85b9-4439-96aa-36c9aa8d5fbd.PNG)

### Getting Started

First clone the repository. Then open a new terminal.
```bash 
$ cd .\ClientApp\ 
$ npm install
$ cd ..
$ dotnet watch run
```
**Note**: you need to have access to the `appsettings.json` file contents to properly run the webapp.

### Packages used
To install a package using the dotnet CLI:  `dotnet add package <package-name>`
- `MongoDB.Driver`
- `Microsoft.AspNetCore.Authentication`
- `Microsoft.AspNetCore.Authentication.JwtBearer`
- `System.IdentityModel.Tokens.Jwt`
- `SendGrid`
- `BCrypt.Net-Next --version 4.0.2`
- `Newtonsoft.Json --version 13.0.1`

### Credentials
Check <a href="https://docs.google.com/document/d/15o92_bAJAjbDGLN3EiKJ3iPX76xrkUo67c9FoZofb4Y/edit?usp=sharing">here</a>

### API List
Check <a href="https://docs.google.com/spreadsheets/d/1Ift-x7HbfvzpTGgtjdmNcCYQPpZp9vUTZ0ohPxVUz8Y/edit?usp=sharing">here</a>

### Potential Errors
- When running the program, an error `Microsoft.AspNetCore.SpaServices[0]: internal/modules/cjs/loader.js:883"` might pop up. Simply remove the node_modules folder and package-lock.json file
- You need the file `appsettings.json` for the program to run.

### Stuff learned
- learned the concept of <a href="https://deviq.com/principles/dependency-inversion-principle"><b>inverse dependency injection</b></a> by abstracting the service class implementations using interfaces to enable a less tightly coupled system. 
- learned the concept of **buisness logic layers** by seperating the controller classes and the service classes. As a result, all the database calls and logic codes are kept abstract from the controller classses.
- Learned dependency injections which is the process of sharing a particular resource across different classes.
- Learned how authentications work behind the scenes with JWT tokens and middewares.

### Potential Security issues
- password is directly sent from client to server which is then encoded. This increases the possibility of man-in-the-middle attacks
