#!/usr/bin/env bash

# Test Creating Users
read -p $'\nCreate User'
curl -X POST -H "Content-Type: application/json" \
     -H "Cache-Control: no-cache" \
     -H "Postman-Token: 6e49311c-f259-8642-2866-809cfea8d2f4" \
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