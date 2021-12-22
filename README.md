# Welcome

Welcome the the frontend repository of the HSA subject regsitration project! See the steps below to setup the frontend step by step.

All relevant information can be found in the [wiki](https://github.com/hsa-projects/subject-registration-frontend/wiki) page of this repository.

Tasks for this project are tracked on this [page](https://github.com/hsa-projects/subject-registration-frontend/projects/1).

# Getting started

**Note:** Make sure that you're connected to the HSA VPN (necessary for authentication to work)! Please refer to this [page](https://www.hs-augsburg.de/en/IT-Services-Center-2/Network.html) for more information.

### 0. Install dependencies

At first, the dependencies of this project need to be installed. Run `npm install` or `yarn` inside the project root folder in order to do this.

Make sure that you've pulled the [backend repository](https://github.com/hsa-projects/subject-registration) of this project.

### 1. Keycloak server

Init the keycloak server with `sudo docker-compose up` (at path `subject-registration/docker`, backend repo)

 * **Note**: if the keycloak server is already initialized, you only have to start the container via `sudo docker-compose start`
 *  Use `sudo docker-compose stop` to stop the container

### 2. Backend

Start the backend: either in IntelliJ by clicking on the Start Application button or in a terminal with command `mvn spring-boot:run` (run inside project root folder)

### 3. Generate API client
In order to generate the API client, run the script `npm run apiGeneration` inside the project root folder. Make sure that backend is running at the time you do this.

* **Note:** generally, you only need to generate the client once. You should, however, re-run the script if some changes are made in backend.

### 4. Start frontend

Start the frontend with `npm run start` (run inside project root folder)

Now a new page on your browser should show up with the address http://localhost:3000/
