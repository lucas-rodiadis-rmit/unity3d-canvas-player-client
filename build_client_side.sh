# Check if UNITY_PROJECTS_DIR is set, if not, exit with an error message
: "${UNITY_PROJECTS_DIR:?UNITY_PROJECTS_DIR is not set}" &&

# Change working directory to the directory of this script
cd "$(dirname "$0")" &&

# Write/update Vite-compatible .env file in the client directory
# so that variables can be injected into the client-side code
cat > .env <<EOF
VITE_DOMAIN_URL=$DOMAIN_URL
VITE_CLIENT_SIDE_URL=$CLIENT_SIDE_URL
EOF

# Make sure the frontend directory exists
mkdir -p "../server/src/public/$CLIENT_SIDE_DIR" && 
# Copy public assets to respective server directory
cp -ra ./public/* "../server/src/public/$CLIENT_SIDE_DIR/" &&
# Copy the index.html file to the test Unity project directory
mkdir -p "../server/$UNITY_PROJECTS_DIR/$UNITY_PROJECT_TEST_DIR/" &&
cp -a ./dist/index.html "../server/$UNITY_PROJECTS_DIR/$UNITY_PROJECT_TEST_DIR/" &&

# Build the client, and copy into built web app into frontend directory
npx vite build && cp -ra ./dist/assets "../server/src/public/$CLIENT_SIDE_DIR/" &&

# Return to the original directory
cd $PARENT_SCRIPT_DIR