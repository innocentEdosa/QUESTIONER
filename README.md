# QUESTIONER


Qusetioner helps meetup organiser crowd-source and prioritize questions for meetup. Other users can
vote on asked questions and questions bubble to the top or bottom based on vote

[![Build Status](https://travis-ci.org/innocentEdosa/QUESTIONER.svg?branch=develop)](https://travis-ci.org/innocentEdosa/QUESTIONER) [![Coverage Status](https://coveralls.io/repos/github/innocentEdosa/QUESTIONER/badge.svg?branch=develop)](https://coveralls.io/github/innocentEdosa/QUESTIONER?branch=develop)[![Maintainability](https://api.codeclimate.com/v1/badges/d924ca34755d0f465fa7/maintainability)](https://codeclimate.com/github/innocentEdosa/QUESTIONER/maintainability)


Visit Questioner on https://innocentedosa.github.io/QUESTIONER/UI

## Features

    Admins can create meetups

    Users can ask questions about meetups 

    Users can downvote and upvote questions thereby increasing or decreasing their priority

    Users can comment on other users questions
    
    Users can schedule to attend meetups

 

## Getting Started

Clone or fork our repository on GitHub or download the entire project as a zip package and run locally.
External Dependencies

Web application is written with javascript using node and expressjs.

To install node  visit nodejs.org

To install express type npm install --save express in the terminal

    Once you have node and express installed , clone the repo by running

    $ git clone https://github.com/innocentEdosa/QUESTIONER.git

    Then run the following command to install gem dependencies:

    $ npm install

    Then run the following command to set up the database:

    $ npm run migration

    Once the command runs successfully, start the express server by running:

    $ npm start

    To access the app locally, visit http://localhost:3006 in a web browser

## Testing

    To test the web application, run the following command to carry out all tests:

    $ npm run test
    
    
    Create meetup: POST https://innocentsquestioner.herokuapp.com/api/v1/meetups
    
    Get all meetup: GET https://innocentsquestioner.herokuapp.com/api/v1/meetups
    
    Get a single meetup: GET https://innocentsquestioner.herokuapp.com/api/v1/meetups/<meetupId>
    
    Delete a single meetup: DELETE https://innocentsquestioner.herokuapp.com/api/v1/meetups/<meetupId>
    
    Get all upcoming meetup: GET https://innocentsquestioner.herokuapp.com/api/v1/meetups/upcoming
    
    Create question for a meetup: POST https://innocentsquestioner.herokuapp.com/api/v1/api/v1/questions
    
    Downvote a question: PATCH https://innocentsquestioner.herokuapp.com/api/v1/questions/<questionId>/downvote
    
    Upvote a question: PATCH https://innocentsquestioner.herokuapp.com/api/v1/questions/<questionId>/upvote
    
    Respond to meetup rsvp: POST https://innocentsquestioner.herokuapp.com/api/v1/meetups/<meetupId>/rsvps
    
    Add a comment to a question: POST https://innocentsquestioner.herokuapp.com/api/v1/questions/<questionId>/comments
    
    Get all comment related to a question: GET https://innocentsquestioner.herokuapp.com/api/v1/questions/<questionId>/comments
    
    Get a single question: GET https://innocentsquestioner.herokuapp.com/api/v1/questions/<questionId>
    
    Sign up: POST https://innocentsquestioner.herokuapp.com/api/v1/auth/signup
    
    Sign in: POST https://innocentsquestioner.herokuapp.com/api/v1/auth/login



## Limitations

    Questioner  is still in development

## Contributing

    Fork it by visiting https://github.com/innocentEdosa/QUESTIONER.git

    Create your feature branch

    $ git checkout -b new_feature

    Contribute to code

    Commit changes made

    $ git commit -a -m 'descriptive_message_about_change'

    Push to branch created

    $ git push origin new_feature

    Then, create a new Pull Request and wait
    
    

