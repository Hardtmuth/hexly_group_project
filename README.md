# Hexlet To Do 

[![lint and test](https://github.com/Hardtmuth/hexly_group_project/actions/workflows/lint_and_test.yml/badge.svg)](https://github.com/Hardtmuth/hexly_group_project/actions/workflows/lint_and_test.yml)


Our Hexlet To Do project is designed to solve household tasks in everyday life. It allows you to display tasks on your monitor screen without keeping them in your head. Next we will tell you how to prepare the project to work, enjoy using it.</span>

## Ttable of contents
- [Hexlet To Do](#hexlet-to-do)
  - [Ttable of contents](#ttable-of-contents)
  - [Technologies](#technologies)
  - [Getting started](#getting-started)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Development](#development)
    - [Testing](#testing)
    - [Deployment and CI/CD Deployment](#deployment-and-cicd-deployment)
  - [Project Team](#project-team)

## Technologies
- __Node JS__: As the JavaScript runtime for building the server-side application.
- __Axios__: For making HTTP requests from the client to the server.
- __Bootstrap__: For responsive and visually appealing UI design.
- __Sqlite3__: For the database, providing lightweight and efficient data storage.
- __Express__: As the backend web framework for building the server-side application.
- __Jest__: JavaScript Testing Framework with a focus on simplicity.

## Getting started

### Requirements

To install and run the project, you need Node.js v20+.

### Installation
install the necessary dependencies, run:
```bash
make install
```

### Development
To start the development server, use the following command:
```bash
make run
```

### Testing
The project uses Jest for testing. Run the tests with:
```bash
make test
```

### Deployment and CI/CD Deployment
To deploy the application, follow these steps:
Ensure all dependencies are installed using make install.Start the development server with make run.The application should now be running and accessible in your web browser.

To automate deployment and other development workflows, the project utilizes Continuous Integration/Continuous Deployment (CI/CD) pipelines. These pipelines can be triggered via a CI/CD service (such as GitHub Actions, GitLab CI, Jenkins, etc.). Follow your CI/CD provider's documentation to set up and run these pipelines.


## Project Team
- Andrey Abramov
- Vyacheslav Ryabov
- Dmitry Semenov
- Nikita Miroshnikov
- Alexander Kazarin

Inspiration and SourcesThis project draws inspiration from the TickTick application, a popular to-do list manager. The development process involved exploring various tutorials and examining source code from similar projects. Some of the resources and inspirations include:
TickTick Application, various web development tutorials on platforms like YouTube and Hexlet. We hope this project serves as a valuable learning experience and a stepping stone for future collaborative software development endeavors.
