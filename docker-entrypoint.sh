#!/bin/sh
set -e

# Generate .htpasswd file from environment variables
if [ -n "$BASIC_AUTH_USER" ] && [ -n "$BASIC_AUTH_PASSWORD" ]; then
    echo "Setting up Basic Authentication for user: $BASIC_AUTH_USER"
    htpasswd -bc /etc/nginx/.htpasswd "$BASIC_AUTH_USER" "$BASIC_AUTH_PASSWORD"
else
    echo "Warning: BASIC_AUTH_USER or BASIC_AUTH_PASSWORD not set"
    echo "Creating default credentials (admin:admin) - CHANGE THIS IN PRODUCTION!"
    htpasswd -bc /etc/nginx/.htpasswd admin admin
fi

# Execute the main command
exec "$@"

