# Check if UNITY_PROJECTS_DIR is set, if not, exit with an error message
: "${UNITY_PROJECTS_DIR:?UNITY_PROJECTS_DIR is not set}" &&

# Change working directory to the directory of this script
cd "$(dirname "$0")" &&

# Write/update Vite-compatible .env file in the client directory
# so that variables can be injected into the client-side code
cat > .env <<EOF
VITE_DOMAIN_URL=$DOMAIN_URL
VITE_PUBLIC_URL=$PUBLIC_URL
EOF

# Copy public assets to respective server directory
cp -ra ./public "../server/src/public" &&

# Build the client and copy into  
npx vite build && cp -ra ./dist/* "../server/$UNITY_PROJECTS_DIR" &&

# Return to the original directory
cd $PARENT_SCRIPT_DIR