# InternFinder

### To run:
- clone the repo
- `dotnet watch run` or `dotnet run`

### Packages used:
To install a package using the dotnet CLI:  `dotnet add package <package-name>`
- `MongoDB.Driver`
- `Microsoft.AspNetCore.Authentication`
- `Microsoft.AspNetCore.Authentication.JwtBearer`
- `System.IdentityModel.Tokens.Jwt`
- `SendGrid`
- `BCrypt.Net-Next`

### Potential Security issues
- password is directly sent from client to server which is then encoded. This increases the possibility of man-in-the-middle attacks
