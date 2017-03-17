#!/bin/bash
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