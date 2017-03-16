#!/bin/bash

## PROJECT TESTS
# Test Creating Project
read -p $'\nCreate Project'
curl -X "POST" "http://localhost:3000/projects" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "title": "AlphaCentauri",
  "short_description": "Let's make some science",
  "creators": "batman"
}'

# Create Project with correct required parameters
read -p $'\nCreate Project optional parameters'
curl -X "POST" "http://localhost:3000/projects" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "title": "AlphaCentauriOptArg",
  "short_description": "Let's make some science",
  "long_desc": "I want to fight the villains near Alpha Centauri, help me get there.",
  "creators": "batman",
  "moderators": ["robin"]
  "city": "Gotham"
}'

# Create project with missing required parameters (missing short_desc)
read -p $'\nCreate Project missing requirements'
curl -X "POST" "http://localhost:3000/projects" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "title": "AlphaCentauriMissArg",
  "creators": "batman"
  }'

# Create Project that already exists
read -p $'\nCreate Project already exists'
curl -X "POST" "http://localhost:3000/projects" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "title": "AlphaCentauri",
  "short_description": "Let's make some science",
  "creators": "batman"
  }'

# Get Project
read -p $'\nGet Project'
curl -X "GET" "http://localhost:3000/projects/AlphaCentauri"


# Get Project does not exist
read -p $'\nGet Project does not exist'
curl -X "GET" "http://localhost:3000/projects/FakeProject"

# Edit Project
read -p $'\nUpdate Project'
curl -X "PUT" "http://localhost:3000/projects/AlphaCentauri" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "user"
  "skills_used": [{"c": 5}, {"haskell": 5}]
}'

# Edit Project without permission

# Delete Project
read -p $'\nDelete Project'
curl -X "DELETE" "http://localhost:3000/projects/AlphaCentauri"

# Delete Project does not exist
read -p $'\nDelete Project does not exist'
curl -X "DELETE" "http://localhost:3000/projects/FakeProject"

# Delete Project no permission

# Search and list Projects by name

# Search and list Projects by name + (optional) tags

# Search and list Projects by name + (optional) tags + (optional) programming skills level