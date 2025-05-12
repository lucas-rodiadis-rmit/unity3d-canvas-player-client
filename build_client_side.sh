# Check if UNITY_PROJECTS_DIR is set, if not, exit with an error message
: "${UNITY_PROJECTS_DIR:?UNITY_PROJECTS_DIR is not set}"

# Copy public assets to respective server directory
cp -ra ./public "../server/src/public" &&

# Build the client and copy into  
npx vite build && cp -ra ./dist/* "../server/$UNITY_PROJECTS_DIR" &&