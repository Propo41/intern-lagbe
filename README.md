# InternFinder

### To run
- clone the repo
- `dotnet watch run` or `dotnet run`

### Note
- When sending payloads to the server, consider 2 cases:

  1. When sending wholesome data models, such as in Registration page, CreateJob page etc, receive the payload as their corresponding models
  2. But when sending edited data or partial data, such as sending only the jobID and status, send the data as FormData and receive the payload as IFormCollection in the server. (*But note that  According to FormData Documentation, FormData.append accepts only a USVString or a Blob. S you will have to convert your data to string and then parse it later on the backend. You can use JSON.stringify to convert your form object to a string.*)

References:
- "https://stackoverflow.com/a/60800516/7570616"

### Packages used
To install a package using the dotnet CLI:  `dotnet add package <package-name>`
- `MongoDB.Driver`
- `Microsoft.AspNetCore.Authentication`
- `Microsoft.AspNetCore.Authentication.JwtBearer`
- `System.IdentityModel.Tokens.Jwt`
- `SendGrid`
- `BCrypt.Net-Next`

### Stuff learned
- learned the concept of <a href="https://deviq.com/principles/dependency-inversion-principle"><b>inverse dependency injection</b></a> by abstracting the service class implementations using interfaces to enable a less tightly coupled system. 
- learned the concept of **buisness logic layers** by seperating the controller classes and the service classes. As a result, all the database calls and logic codes are kept abstract from the controller classses.
- Learned dependency injections which is the process of sharing a particular resource across different classes.
- Learned how authentications work behind the scenes with JWT tokens and middewares.

### Potential Security issues
- password is directly sent from client to server which is then encoded. This increases the possibility of man-in-the-middle attacks
