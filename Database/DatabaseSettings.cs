namespace dotnet_web_api_demo.Database
{
    /* In general we need these above 3 information to describe our 
    connection to Database, as well as collection itself. 
    In real life, we will keep these in some sort of environment file. */
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string CollectionString { get; set; }
        public string DatabaseName { get; set; }

    }
}