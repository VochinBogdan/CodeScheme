#!/bin/bash

mongo codescheme --eval "db.dropDatabase()"

## USER TESTS
read -p $'\nSend a POST /users request without a username, password or email, should return 400 error'
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: e45c1bea-91e7-d38e-445d-11e1953f16d6" -d '{}' "http://localhost:3000/users/"

read -p $'\nSend a POST /users request without a password, with username justcourt and email email@email, should return 400 error'
curl -X POST -H "Content-Type: application/json" -d '{"username":"justcourt","email":"email@email.com"}' "http://localhost:3000/users/"

read -p $'\nGet request to /users/justcourt, should return 404 error as user is not in database'
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/justcourt"

read -p $'\nSend a POST /users request with username \'justcourt\', email \'justcourt@gmail.com\', password \'hunter2\', should return message \'justcourt created\''
curl -X POST -H "Content-Type: application/json" -d '{"username":"justcourt","email":"justcourt@gmail.com","password":"hunter2"}' "http://localhost:3000/users/"

read -p $'\nGet request to /users/justcourt, should return JSON representing user justcourt'
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/justcourt"

read -p $'\nPost to /users with username \'justcourt\', email \'fakeemail\', password \'password\', since username already exists, should return 403 error'
curl -X POST -H "Content-Type: application/json" -d '{"username":"justcourt","email":"fakeemail","password":"password"}' "http://localhost:3000/users/"

read -p $'\nPost to /users with username \'fakeusername\', email \'justcourt@gmail.com\', password \'password\', since email already exists, should return 403 error'
curl -X POST -H "Content-Type: application/json" -d '{"username":"fakeusername","email":"justcourt@gmail.com","password":"password"}' "http://localhost:3000/users/"

read -p $'\nSend a POST /users request with username \'justcourt2\', email \'email2\', password \'hunter2\', should return message \'justcourt2 created\''
curl -X POST -H "Content-Type: application/json" -d '{"username":"justcourt2","email":"email2","password":"hunter2"}' "http://localhost:3000/users/"

read -p $'\nGet request to /users/justcourt, should return JSON representing user justcourt2'
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/justcourt2"



read -p $'\nSend a POST /users request with username \'batman\', email \'batman@gmail.com\', password \'123456\', should return message \'batman created\''
curl -X POST -H "Content-Type: application/json" -d '{"username":"batman","email":"batman@gmail.com","password":"123456"}' "http://localhost:3000/users/"

read -p $'\nGet request to /users/:username/private, should return JSON representing user email, projects, and projects following'
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/batman/private"

read -p $'\nGet request to /users/:username/private on a username that does not exist, should return 404 error'
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/FakeUser/private"

read -p $'\nEdit a user\'s information. Put request to /users/:username/ with city \'Gotham\', github \'github.com/batman\', and school \'UofT\', should return HTTP OK'
curl -X PUT -H "Content-Type: application/json" -d '{"oldPassword":"123456","city":"Gotham","github":"github.com/batman","school":"UofT"}' "http://localhost:3000/users/batman"

read -p $'\nCheck to see that batman\'s information was actually updated, should return JSON of updated information'
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/batman"

read -p $'\nEdit a user\'s information without a password. Put request to /users/:username with city \'JokerTown\', github \'github.com/joker\', and school \'bleh\', should return 400 error'
curl -X PUT -H "Content-Type: application/json" -d '{"city":"JokerTown","github":"github.com/joker", "school":"bleh"}' "http://localhost:3000/users/batman"

read -p $'\nCheck to see that batman\'s information was not updated, should return JSON information of batman'
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/batman"

read -p $'\nEdit a user\'s information with an incorrect password and city \'JokerTown\', should return 403 error'
curl -X PUT -H "Content-Type: application/json" -d '{"oldPassword":"whatsurpass","city":"JokerTown"}' "http://localhost:3000/users/batman"

read -p $'\nCheck to see that information was not updated, should return JSON information of batman'
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/batman"

read -p $'\nCreate a new user to test that updated email cannot be an existing email, should return message \'superman created\''
curl -X POST -H "Content-Type: application/json" -d '{"username":"superman","email":"superman@gmail.com","password":"654321"}' "http://localhost:3000/users/"

read -p $'\nTry to update the email of an user to an existing email, should return 403 error'
curl -X PUT -H "Content-Type: application/json" -d '{"oldPassword":"654321","email":"batman@gmail.com"}' "http://localhost:3000/users/superman"

read -p $'\nDelete the user batman. Delete request to /users/:username with password, should return HTTP OK'
curl -X DELETE -H "Content-Type: application/json" -d '{"password":"123456"}' "http://localhost:3000/users/batman"

read -p $'\nDelete a non-existing user batman, should return 403 error'
curl -X DELETE -H "Content-Type: application/json" -d '{"password":"123456"}' "http://localhost:3000/users/batman"

read -p $'\nDelete the user superman with incorrect password, should return 403 error'
curl -X DELETE -H "Content-Type: application/json" -d '{"password":"000000"}' "http://localhost:3000/users/superman"


## PROJECT TESTS

# Create Project
read -p $'\nCreate Project'
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     -d 'title=CleanUpGotham&short_desc=taking out the trash&long_desc=Nanananana BATMAN!!&username=Batman' "http://localhost:3000/projects"

# Create Project with optional parameters
read -p $'\nCreate Project optional parameters'
curl -X POST -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -d '{
        "title":"DirtyUpGotham",
        "short_desc":"bringing in the trash",
        "long_desc":"get the bat",
        "username":"Joker",
        "num_needed":"5"
        }' "http://localhost:3000/projects"

# Create project with missing required parameters (should result in error)
read -p $'\nCreate Project with missing requirements (should result in error)'
curl -X POST -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -d '{
        "title":"SaveMatropolis"
        }' "http://localhost:3000/projects"

# Create Project that already exists (should result in error)
read -p $'\nCreate Project already exists (should result in error)'
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'title=DirtyUpGotham&username=Joker&short_desc=bringing in the trash' "http://localhost:3000/projects"

# Get Project
read -p $'\nGet Project'
curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" "http://localhost:3000/projects/CleanUpGotham"

# Get Project does not exist (should result in error)
read -p $'\nGet Project does not exist (should result in error)'
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/projects/FakeProject"

# Edit Project
read -p $'\nUpdate Project'
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'title=CleanUpGotham&username=Batman&city=Gotham' "http://localhost:3000/projects/CleanUpGotham"

# Edit Project with missing required parameters
read -p $'\nUpdate Project with missing required parameters (should result in error)'
curl -X PUT -H "Content-Type: application/json" \
     -d '{
	    "num_needed":"5",
	    "creator":"Batman"
        }' "http://localhost:3000/projects/CleanUpGotham"

# Edit Project without permission (should result in error)
read -p $'\nUpdate Project no permission (should result in error)'
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'title=CleanUpGotham&username=Joker' "http://localhost:3000/projects/CleanUpGotham"

# Edit Project that doesn't exist
read -p $'\nUpdate Project that does not exist (should result in error)'
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'title=FakeProject&username=user1&city=Metropolis' "http://localhost:3000/projects/FakeProject"

# Delete Project
read -p $'\nDelete Project'
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'title=CleanUpGotham&username=Batman' "http://localhost:3000/projects/CleanUpGotham"

# Delete Project with missing required parameters
read -p $'\nDelete Project with missing required parameters (should result in error)'
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'title=DirtyUpGotham' "http://localhost:3000/projects/DirtyUpGotham"

# Delete Project without permission (should result in error)
read -p $'\nDelete Project without permission (should result in error)'
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'title=DirtyUpGotham&username=Batman' "http://localhost:3000/projects/DirtyUpGotham"

# Delete Project does not exist (should result in error)
read -p $'\nDelete Project does not exist (should result in error)'
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'title=CleanUpGotham&username=Batman' "http://localhost:3000/projects/CleanUpGotham"

# Search get list of all projects
read -p $'\nSearch with no set query (should return all projects)'
curl -X GET -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     "http://localhost:3000/projects"




