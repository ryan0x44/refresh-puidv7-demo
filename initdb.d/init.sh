#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER demo WITH ENCRYPTED PASSWORD 'refresh25';
	CREATE DATABASE demo OWNER demo;
EOSQL
