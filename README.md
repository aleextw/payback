# Payback
Payback is a simple website I built to help split and share bills more easily between friends.

## Running the Application
The easiest way to run this application would be via the included docker compose script. From the root directory of this repo, run:
```
docker compose up
```

If instead you wish to run the application directly on your system, you can instead:
1. Navigate to the `backend` directory
2. Serve the backend via

```
uvicorn app.main:app
```

3. Navigate to the `frontend` directory 
4. Build the site for production with

```
yarn build
```

5. Serve the production site via

```
serve -s build
```