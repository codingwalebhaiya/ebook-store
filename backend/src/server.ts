import { config } from "./config/config";
import app from "./app"
import connectDB from "./db/db"; 
 
const startServer = async () => {
 
    // connect database 
    await connectDB(); 

    
    const port = config.port || 4000;
 
    app.listen(port, () => {
        console.log(`server is running on port: ${port}`);
        
    }) 
}

startServer();
 