### Setting up MySQL Database

You must set up a MySQL database to continue with this process. For detailed instructions and additional guidance, refer to the official [MySQL documentation](https://dev.mysql.com/doc/).

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