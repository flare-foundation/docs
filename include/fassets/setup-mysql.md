### Setting up MySQL Database

To proceed with this process, you must set up a MySQL database. You have two options: using Docker (preferred) or installing it manually.

#### Setting up MySQL Database with Docker

1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Create a `docker-compose.yml` file in your directory, add the following lines, and change the value of `VerySafePassword` according to your security standards:
   ```docker
   version: '3.8'

   services:
     mysql:
       image: mysql:8.0
       restart: always
       hostname: mysql
       environment:
         MYSQL_ROOT_PASSWORD: 'root'
         MYSQL_DATABASE: 'fasset_bots'
         MYSQL_USER: 'fassetbot'
         MYSQL_PASSWORD: 'VerySafePassword'
       volumes:
         - ./data:/var/lib/mysql
         - ./init.mysql.sql:/docker-entrypoint-initdb.d/init.mysql.sql # Initialization SQL file
       ports:
         - "3306:3306"
       healthcheck:
         test: ['CMD', 'mysqladmin', 'ping', '-h', '127.0.0.1', '-u', 'root', '-p$MYSQL_ROOT_PASSWORD']
         timeout: 20s
         retries: 10
   ```
3. Create a file named `init.mysql.sql` in the same directory, add the following lines, and change the value of `VerySafePassword` according to your security standards:
   ```sql
   CREATE USER IF NOT EXISTS 'fassetbot'@'%' IDENTIFIED BY 'my1beta2password3';
   GRANT ALL PRIVILEGES ON *.* TO 'fassetbot'@'%' WITH GRANT OPTION;
   GRANT ALL PRIVILEGES ON fasset_bots.* TO 'fassetbot'@'%' WITH GRANT OPTION;
   ```
4. Start the MySQL server as a Docker container by running `docker-compose up -d`. After the MySQL database is started, it will continue to run in the background every time you run the agent.
5. In the `secrets.json` file, add this block to the list to set the `user` and `password` for the database, and change the value of `password` to the same password you have been using.
    ```
    "database": {
        "user": "fassetbot",
        "password": "my1beta2password3"
    }
    ```
6. In the `config.json` file, update the value of `extends` to `coston-bot-mysql.json`.

#### Setting up MySQL Database Manually

To install the MySQL database manually, refer to the official [MySQL documentation](https://dev.mysql.com/doc/).

You can find MySQL database connection parameters in the file listed as the value for the variable `FASSET_BOT_CONFIG` in the `.env` file.

Create a new user in MySQL that will be used by the `fasset-bots` to connect to the database. In this example, we will create a user with the username `fassetbot` and password `VerySafePassword`, which you must replace with a secure value.

!!! warning
	You only need to create the user in the database and grant privileges to that user. Do not create the database.

1. Open your terminal or command prompt and login to MySQL database using the `mysql` command with the appropriate credentials:

2. Create a new user `fassetbot` in MySQL database using the "CREATE USER" command with the password "VerySafePassword":
     
    ```sql
    CREATE USER 'fassetbot'@'localhost' IDENTIFIED BY 'VerySafePassword';
    ```

3. Grant all privileges on all databases to the user by using the `GRANT` statement:
    
    ```sql
    GRANT ALL PRIVILEGES ON *.* TO 'fassetbot'@'localhost' WITH GRANT OPTION;
    ```

4. **Grant Privileges:**
    After creating the user, you need to grant appropriate privileges to the user. Use the `GRANT` statement to give permissions to the user. For example, to grant all privileges on `fasset_bots` database:
     ```sql
     GRANT ALL PRIVILEGES ON fasset_bots.* TO 'fassetbot'@'localhost' WITH GRANT OPTION;
     ```

5. Exit the MySQL database prompt by typing:
    
    ```bash
    exit;
    ```