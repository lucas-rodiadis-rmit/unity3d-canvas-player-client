# Canvas Unity 3D Player Frontend Application
This application is to be used in conjunction with the [Canvas Unity 3D Player Backend Server](https://github.com/lucas-rodiadis-rmit/unity3d-canvas-player-server). This frontend application alongside the backend application can create a system that can work as an LTI 1.1 compliant external app that can be used in Canvas to embed WebGL Unity3D Builds. 

It is built using Vite and React.js, using primarily TypeScript. 

## Technical Report Documentation
This application is part of the **Canvas Unity 3D Player** System and is thoroughly documented in this [Technical Report](https://rmiteduau.sharepoint.com/:w:/r/sites/ProgrammingProject1-CanvasUnity3D/Shared%20Documents/General/Project%20Documents/Assignment%202/HuDINi-540-technical-report.docx?d=w928004d177be4532a09d1c30dab9bb7f&csf=1&web=1&e=QojHGf) (Updated as of 15 June 2025) 
## Developing Frontend Application
These are the instructions to run the development environment.

Follow the following:
- Make a .env file with the following (this may need to be modified when used for production)
```
VITE_API_URL=http://localhost:8080/api/v1
VITE_CLIENT_URL_BASE=/
```


- Run command
``` npm run dev```
