# Social Distancing: The Game

When you just want to punch some people 👊

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
yarn install
yarn dev
```

### Deployment

```bash
yarn build
```

Serves contents of `public` folder.
