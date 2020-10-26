# Social Distancing: The Game

### Configuration

1. Create a new [Firebase](https://firebase.google.com/) project,
1. Create `databaseConfig.json` file at root directory and fill it in with your Firebase info. You can find it in [Firebase console](https://console.firebase.google.com/) - select your project and go to "General" tab in "Settings". It should have this structure:

```json
{
  "apiKey": "...",
  "authDomain": "...",
  "databaseURL": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "..."
}
```

### Development

```bash
npm ci
npm run dev
```
