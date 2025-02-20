#!/bin/bash

for i in {1..20}
do
  echo "Request #$i"
  curl -X GET http://localhost:8000/slow
  echo ""  # Add a newline for readability
done