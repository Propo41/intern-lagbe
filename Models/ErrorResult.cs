namespace InternFinder.Models
{
    public class ErrorResult
    {
        public string title { get; set; }
        public int status { get; set; }
        public Error errors { get; set; }

        public class Error
        {
            public string error { get; set; }
        }

        public ErrorResult(string title, int status, string errorMessage)
        {
            this.title = title;
            this.status = status;
            this.errors = new Error { error = errorMessage };

        }

    }

}