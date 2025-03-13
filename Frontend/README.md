## About

This project was developed following the Frontend Software Engineer - Technical Challenge Requirements.

## Menu
- [Features](#features)  
- [How It Works](#how-it-works)  
- [Screenshots](#screenshots)  
- [Decisions, Assumptions and Improvements](#decisions-assumptions-and-improvements)  
- [Pre-requisites](#pre-requisites)  
- [Running the Web Application](#running-the-web-application)

## Features

- [ ] User will be able to trigger a validation Process Divided by three steps :
  - [x] Person should exist in the national registry system and should match the information in local database.
  - [x] Person does not have any juditial records in the national archives' external system.
  - [x] System internal validation process outputing a Score between 0 and 100. 
- [ ] User will be able to see the prospects and leads information.

---

## How it works

The Project structure is the following :
	
	public/
	│── icons/
	│── index.html
	src/
	│── components/
	│   │── Header/
	│   │── PotentialProspects/
	│   │   │── PeopleList/
	│   │   │   │── SinglePerson/
	│   │   │   │   │── SinglePerson.jsx
 	│   │   │   PeopleList.jsx
	│   │   │── SinglePersonModal/
 	│   │   │   │   │── SinglePerson.jsx
	│   │   │   PotentialProspects.jsx
	│   │── UI/
	│   │   │── Box/
	│   │   │── Button/
	│   │   │── Icon/
	│   │   │── Modal/
	│   │   │── Spinner/
	│   │   │── Subtitle/
 	│   │   │── Title/
	│   │   │── Text/
	│── context/
	│   │── leadsContext/
	│   │   │── leadsContext.jsx
	│── data/
	│   │── leads_data.js
	│── services/
	│   │── judicialRecordsValidation.js
	│   │── matchesInformationValidation.js
	│   │── qualificationScoreValidation.js
	│── App.css
	│── App.js
	│── App.test.js
	│── index.css

#### Folder Descriptions
- public/: Contains public files accessible directly, such as index.html and icons.
- src/: The project's main source code.
  - components/: Contains reusable UI components.
    - Header/: The main header component, it contains instructions.
    - PotentialProspects/: Manages the leads/prospects lists and details of potential prospects.
      -  PeopleList/: Manages the leads/prospects display
         - SinglePerson/: Manage a single lead/prospect display and triggers the validation process.
      -  SinglePersonModal/: Manages the Modal where the user can see the selected lead/prospect information and validation process.
         - ProspectProgress/: Tracks the lead/prospect validation process step by step.     
    - UI/: Reusable UI components such as buttons, modals, and boxes.
  - context/:
    - leadsContext/: Holds Context data and modifiers for the Leads-Prospects List. 
  - data/: Mock data used for testing purposes, holds the Leads data.
  - services/: External validators' logic.
- App.js: Root component of the application.
- index.css: Global styles. 

## Screenshots

![image](https://github.com/user-attachments/assets/db42ae01-4acc-41d7-881b-5cf28f5b581c)
![image](https://github.com/user-attachments/assets/84e7b64c-db60-4f3f-941a-2e158fc5dfda)
![image](https://github.com/user-attachments/assets/5101f494-2a53-499b-9af0-b85b5ec7200c)
![image](https://github.com/user-attachments/assets/61e0801c-a284-40ba-9036-b608b0cb3927)

## Decisions, assumptions and improvements

An early assumption was made while approaching the external system integration and execution, appreciating 
the fact that a single lead information contains the following data. It was easier to make some dummy processes to simulate asynchronous
calls imitating the external services execution
	
	 {
	    id: 'c1',
	    national_id_number: '456-78-9012',
	    first_name: 'Alice',
	    last_name: 'Has Judicial Records Johnson',
	    email: 'alicejohnson@mail.com',
	    birthdate: '1990-01-01',
	    matchesPersonalInformation: true,
	    hasJudicialRecords: true,
  	},

Considering that, the services are structured as a single validation and a short delay to visualize on how the last process had to wait
for the prior ones to conclude so that it could execute. 

Following with the interface decisions made. Some general decisions throughought the development where creating <strong>UI Components/strong> for basic elements 
that worked as assets for more complex Components. Some of these have their own styling as default properties for a quicker/more simple 
implementation for them.

The project Core lays on the <strong>Potential Prospects</strong> Component, which is compounded by two Components. 
First is the PeopleList, that is mainly in charge of rendering the two list, one for leads and the other one for prospects. 
It has one single sub-component that renders each single register, which mainly holds a function given by Potential Prospects so that it triggers the validation/consult process.

On the other hand, the second component is the SinglePersonModal, whose render depends on the previous trigger mentioned. It contains at first default information for both
consult and validation process. 
By the time the user wants to validate the selected user, SinglePersonModal renders its single sub-component ProspectProgress, that is in charge
of displaying the three step validation process, making use of the provided services for that matter.

Since the validation process from SinglePersonModal updates the UI for both lists on the PeopleList, there is a leadsContext implemented, in order to create a leaner data update. 

#### Improvements 

Some improvements that could be done, with the current proposal, are implementing a discarded pool of rejected leads in order to visualize them and also attach the rejection cause.
In other matters, it could be a little better to have a wireframe of the solution in order to avoid some misunderstandings, however, it could lead to some restrictions to measure the
creativeness of the participant. In conclusion, I consider this test a well structured approach to test both hard and soft skills related to the participant as an individual.

## Pre-requisites

It is required to have the following tools installed on the machine:
[Git] (https://git-scm.com), [Node.js] (https://nodejs.org/en/).

## Running the web application

```bash

# Clone this repository
$ git clone git@github.com

# Access the project folder 

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm start

# The application will open on the port: 3000 - go to http://localhost:3000

# Run the testing scripts
$ npm run test

```
