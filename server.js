import { connectDB } from "./app.js"
import app from "./app.js"

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`app is active at ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})