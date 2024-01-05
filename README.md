# Flare Technical Documentation

![example workflow](https://github.com/flare-foundation/docs/actions/workflows/ci.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/1603e657-66b1-4125-816b-e6b86f62d589/deploy-status)](https://app.netlify.com/sites/flare-docs-previews/deploys)

This is the source repository for the [Flare docs](https://docs.flare.network/) site.

## Run locally

To get started, you have two main options for setting up your development environment: utilizing a Docker container or a manual setup. While both methods are effective, we recommend using a Docker container to avoid version discrepancies with the rest of the team.

### Using Docker Container

1. [Download](https://www.docker.com/products/docker-desktop/) and install Docker Desktop

2. In the command line navigate to the repository folder and build the docker container with the command:

   ```bash
   docker compose up --no-start
   ```

3. After this step, You can run it from the Docker Desktop app. Open Docker Desktop, navigate to the Containers section, and run the `docs-private` container.

   ![Start Flare Docs in Docker Desktop](/readme/docker-desktop-start.png)

4. To see the console logs or errors, open the Docker Desktop app and go to the `docs-private` container details under the containers section.

   ![Open Container details in Docker Desktop](/readme/docker-desktop-open-container.png)

   Check all the warnings because the automatic build process will not accept them when creating a pull request.

   ![Container details in Docker Desktop](/readme/docker-desktop-container-details.png)

5. From your browser, go to URL [localhost:8000](http://localhost:8000/) to see the documentation page.

6. Press the stop button in the Docker Desktop app to stop it.

   ![STOP Flare Docs in Docker Desktop](/readme/docker-desktop-stop.png)

### Manual Setup

1. [Download](https://www.python.org/downloads/) and install Python.

2. [Install](https://pip.pypa.io/en/stable/installation/) PIP, the Python package manager.

3. Install required packages.

   ```bash
   pip install -r requirements.txt
   ```

4. To run locally, execute this command. When you want to stop the server, press Ctrl + C.

   ```bash
   mkdocs serve
   ```

5. From your browser, go to URL [localhost:8000](http://localhost:8000/) to see the documentation page.
