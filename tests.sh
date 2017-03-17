#!/bin/bash

## USER TESTS

read -p $'\nSend a POST /users request without a username, password or email, should return 400 error'
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: e45c1bea-91e7-d38e-445d-11e1953f16d6" -d '{}' "http://localhost:3000/users/"

read -p $'\nSend a POST /users request without a password, with username justcourt and email email@email, should return 400 error'
curl -X POST -H "Content-Type: application/json" -d '{"username":"justcourt","email":"email@email.com"}' "http://localhost:3000/users/"

read -p $"\nGet request to /users/justcourt, should return 404 error as user is not in database"
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/justcourt"

read -p $"\nSend a POST /users request with username 'justcourt', email 'justcourt@gmail.com', password 'hunter2', should return message 'justcourt created'"
curl -X POST -H "Content-Type: application/json" -d '{"username":"justcourt","email":"justcourt@email.com","password":"hunter2"}' "http://localhost:3000/users/"

read -p $"\nGet request to /users/justcourt, should return JSON representing user justcourt"
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/justcourt"

read -p $"\nPost to /users with username 'justcourt', email 'fakeemail', password 'password', since username already exists, should return 403 error"
curl -X POST -H "Content-Type: application/json" -d '{"username":"justcourt","email":"fakeemail","password":"password"}' "http://localhost:3000/users/"

read -p $"\nPost to /users with username 'fakeusername', email 'justcourt@gmail.com', password 'password', since email already exists, should return 403 error"
curl -X POST -H "Content-Type: application/json" -d '{"username":"fakeusername","email":"justcourt@gmail.com","password":"password"}' "http://localhost:3000/users/"

read -p $"\nSend a POST /users request with username 'justcourt2', email 'email2', password 'hunter2', should return message 'justcourt2 created'"
curl -X POST -H "Content-Type: application/json" -d '{"username":"justcourt2","email":"email2","password":"hunter2"}' "http://localhost:3000/users/"

read -p $"\nGet request to /users/justcourt, should return JSON representing user justcourt2"
curl -X GET -H "Content-Type: application/json" "http://localhost:3000/users/justcourt2"

#!/bin/bash
# Test Creating Users
read -p $'\nCreate User'
curl -X POST -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -d '{
        "username":"Batman",
        "password":"123456",
        "email":"batman@gmail.com"
        }' "http://localhost:3000/users"

# Create User missing required parameter (should result in error)
read -p $'\nCreate User missing parameter (should result in error)'
curl -X POST -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -d '{
        "username": "robin",
        "email": "boywonder@gmail.com"
        }' "http://localhost:3000/users"

# Create User that already exists (should result in error)
read -p $'\nCreate User already exists (should result in error)'
curl -X POST -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -H "Postman-Token: 6e49311c-f259-8642-2866-809cfea8d2f4" \
     -d '{
        "username":"Batman",
        "password":"123456",
        "email":"batman@gmail.com"
        }' "http://localhost:3000/users"

# Get user
read -p $'\nGet user'
curl -X GET -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache"
     "http://localhost:3000/users/Batman"

# Get user does not exist (should result in error)
read -p $'\nGet user does not exist (should result in error)'
curl -X GET -H "Content-Type: application/json" \
     "http://localhost:3000/users/FakeUser"

# Edit User
read -p $'\nEdit User'
curl -X PUT -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -d '{
        "username":"Batman",
        "password":"123456",
        "city":"Gotham"
        }' "http://localhost:3000/users/Batman"

# Edit User without permission (should result in error)
read -p $'\nEdit User without permission (should result in error)'
curl -X PUT -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -d '{
        "username":"Batman",
        "password":"whatsurpassword",
        "city":"JokerTown"
        }' "http://localhost:3000/users/Batman"

# Delete User
read -p $'\nDelete User'
curl -X POST -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -H "Postman-Token: 6e49311c-f259-8642-2866-809cfea8d2f4" \
     -d '{
        "username":"Joker",
        "password":"HAHAHA",
        "email":"Joker@gmail.com"
        }' "http://localhost:3000/users"
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     -d '{
	    "username":"Joker",
	    "password":"HAHAHA"
        }' "http://localhost:3000/users/Joker"

# Delete user without permission (should result in error)
read -p $'\nDelete user without permission (should result in error)'
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     -d '{
	    "username":"Batman",
	    "password":"BATS"
        }' "http://localhost:3000/users/Batman"

# Delete user does not exist (should result in error)
read -p $'\nDelete user does not exist (should result in error)'
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     -d '{
        "username":"Joker",
	    "password":"HAHAHA"
        }' "http://localhost:3000/users/Joker"

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
read -p $'\nCreate Project missing requirements (should result in error)'
curl -X POST -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -d '{
        "title":"SaveMatropolis",
        "username":"SuperMan"
        }' "http://localhost:3000/projects"

# Create Project that already exists (should result in error)
read -p $'\nCreate Project already exists (should result in error)'
curl -X POST -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -H "Postman-Token: 60f6ad4b-658c-f5f3-fa61-063a865ab254" \
     -d '{
        "title":"DirtyUpGotham",
        "short_desc":"bringing in the trash",
        "username":"Joker",
        }' "http://localhost:3000/projects"

# Get Project
read -p $'\nGet Project'
curl -X GET -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache"
     "http://localhost:3000/projects/CleanUpGotham"

# Get Project does not exist (should result in error)
read -p $'\nGet Project does not exist (should result in error)'
curl -X GET -H "Content-Type: application/json" \
     "http://localhost:3000/projects/FakeProject"

# Edit Project
read -p $'\nUpdate Project'
curl -X PUT -H "Content-Type: application/json" \
     -d '{
	    "num_needed":"5",
	    "creator":"Batman"
        }' "http://localhost:3000/projects/CleanUpGotham"

# Edit Project without permission (should result in error)
read -p $'\nUpdate Project no permission (should result in error)'
curl -X PUT -H "Content-Type: application/json" \
     -d '{
	    "num_needed":"5",
	    "creator":"Joker"
        }' "http://localhost:3000/projects/CleanUpGotham"

# Delete Project
read -p $'\nDelete Project'
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     -d '{
	    "creator":"Joker"
        }' "http://localhost:3000/projects/DirtyUpGotham"

# Delete Project without permission (should result in error)
read -p $'\nDelete Project without permission (should result in error)'
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     -d '{
	    "creator":"Joker"
        }' "http://localhost:3000/projects/CleanUpGotham"

# Delete Project does not exist (should result in error)
read -p $'\nDelete Project does not exist (should result in error)'
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     -d '{
	    "creator":"Joker"
        }' "http://localhost:3000/projects/FakeProject"

# Search get list of all projects
read -p $'\nSearch with no set query (should return all projects)'
curl -X GET -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     "http://localhost:3000/projects"

# Search projects with title CleanUpGotham
read -p $'\nSearch with title query'
curl -X GET -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     "http://localhost:3000/projects?title=CleanUpGotham"

# Search projects with no matches
read -p $'\nSearch with no matches (return empty array)'
curl -X GET -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Cache-Control: no-cache" \
     "http://localhost:3000/projects?title=FakeProject"




