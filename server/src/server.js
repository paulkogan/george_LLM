import { app } from "./app.js"

const env = process.env.NODE_ENV || "development"

const port = (env == "test") ? 3003 : 3001
    
app.listen(port, () => console.log(`George Server 2 listening on port ${port}!`))
