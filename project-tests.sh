#!/bin/bash

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




