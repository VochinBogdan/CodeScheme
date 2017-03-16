#!/bin/bash

## USER TESTS
# Test Creating Users
read -p $'\nCreate User'
curl -X "POST" "http://localhost:3000/users" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
     "username": "batman",
     "password": "123456",
     "email": "batman@gmail.com",
}'

# Create User missing required parameter
read -p $'\nCreate User missing parameter'
curl -X "POST" "http://localhost:3000/users" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
     "username": "robin",
     "email": "boywonder@gmail.com",
}'

# Create User that already exists
read -p $'\nCreate User already exists'
curl -X "POST" "http://localhost:3000/users" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
     "username": "batman",
     "password": "123456",
     "email": "batman@gmail.com",
}'

# Edit User
read -p $'\nEdit User'
curl -X "PUT" "http://localhost:3000/users/batman" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
     "email": "DarkKnight@gmail.com",
}'

# Edit User without permissions

# Delete User
read -p $'\nDelete User'
curl -X "DELETE" "http://localhost:3000/users/batman"

# Delete User does not exist
read -p $'\nDelete User does not exist'
curl -X "DELETE" "http://localhost:3000/users/FakeUser"

# Search and list Users by name
