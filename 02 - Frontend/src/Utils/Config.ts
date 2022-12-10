// Development + Production configurations
class Config {
    // public supportPhone = "031234567";
}

// Development configuration:
class DevelopmentConfig extends Config {
    public taskUrl = "http://localhost:3001/api/tasks/";
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public tasksImageUrl = "http://localhost:3001/api/tasks/images/";
    public product2Url = "http://localhost:3001/api/products/";

}

// Production configuration:
class ProductionConfig extends Config {
    public registerUrl = "https://northwind-by-assaf.herokuapp.com/api/auth/register/";
    public loginUrl = "https://northwind-by-assaf.herokuapp.com/api/auth/login/";
    public taskUrl = "http://localhost:3001/api/tasks/";
    public taskUrl2 = "http://localhost:3001/api/tasks2/";
    public tasksImageUrl = "http://localhost:3001/api/tasks/images/";
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
