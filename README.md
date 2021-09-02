# InternFinder

### Getting Started

First clone the repository. Then open a new terminal.
```bash 
$ cd .\ClientApp\ 
$ npm install
$ cd ..
$ dotnet watch run
```

### Packages used
To install a package using the dotnet CLI:  `dotnet add package <package-name>`
- `MongoDB.Driver`
- `Microsoft.AspNetCore.Authentication`
- `Microsoft.AspNetCore.Authentication.JwtBearer`
- `System.IdentityModel.Tokens.Jwt`
- `SendGrid`
- `BCrypt.Net-Next --version 4.0.2`
- `Newtonsoft.Json --version 13.0.1`

# IMPORTANT FOR PRODUCTION
- all comments with @debug initials, remove them during production

### Potential Errors
- When running the program, an error `Microsoft.AspNetCore.SpaServices[0]: internal/modules/cjs/loader.js:883"` might pop up. Simply remove the node_modules folder and package-lock.json file
- You need the file `appsettings.json` for the program to run.

### Credentials
Check <a href="https://docs.google.com/document/d/15o92_bAJAjbDGLN3EiKJ3iPX76xrkUo67c9FoZofb4Y/edit?usp=sharing">here</a>

### API List
Check <a href="https://docs.google.com/spreadsheets/d/1Ift-x7HbfvzpTGgtjdmNcCYQPpZp9vUTZ0ohPxVUz8Y/edit?usp=sharing">here</a>

### Note
- When sending payloads to the server, consider 2 cases:

  1. When sending wholesome data models, such as in Registration page, CreateJob page etc, receive the payload as their corresponding models
  2. But when sending edited data or partial data, such as sending only the jobID and status, send the data as FormData and receive the payload as IFormCollection in the server. (*But note that  According to FormData Documentation, FormData.append accepts only a USVString or a Blob. S you will have to convert your data to string and then parse it later on the backend. You can use JSON.stringify to convert your form object to a string.*)

References:
- "https://stackoverflow.com/a/60800516/7570616"

### Stuff learned
- learned the concept of <a href="https://deviq.com/principles/dependency-inversion-principle"><b>inverse dependency injection</b></a> by abstracting the service class implementations using interfaces to enable a less tightly coupled system. 
- learned the concept of **buisness logic layers** by seperating the controller classes and the service classes. As a result, all the database calls and logic codes are kept abstract from the controller classses.
- Learned dependency injections which is the process of sharing a particular resource across different classes.
- Learned how authentications work behind the scenes with JWT tokens and middewares.

### Potential Security issues
- password is directly sent from client to server which is then encoded. This increases the possibility of man-in-the-middle attacks
