# Travel Log

A full stack Node.js/React.js app to store and describe places you have visited. Powered using the Mapbox API.

## Structure

```
.
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── api
    │   └── logs.js
    ├── index.js
    ├── middlewares.js
    └── models
        └── LogEntry.js
```

## Model: Log Entry

* Title - Text
* Description - Text
* Comments - Text
* Rating - scale of 1 to 10
* Image - Text - URL
* Latitude - Number
* Longitude - Number
* Visit Date - DateTime
* Created At - DateTime
* Updated At - DateTime
