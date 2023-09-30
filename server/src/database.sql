CREATE TABLE "user" (
    uid VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    twitterJobs INTEGER[],
    LinkedinJob INTEGER[],
    Projects INTEGER[]
);