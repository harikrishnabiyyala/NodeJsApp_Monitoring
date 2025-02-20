#!/bin/bash

# Define an array with possible paths
paths=("" "/slow")

for i in {1..25}
do
  # Select a random path
  random_path=${paths[$RANDOM % ${#paths[@]}]}

  # Construct the full URL
  url="http://localhost:8000$random_path"

  echo "Request #$i to $url"
  curl -X GET "$url"
  echo ""  # Add a newline for readability
done