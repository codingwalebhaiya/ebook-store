import app from "./app"

const startServer = () => {
    
    const port = process.env.PORT || 4000;

    app.listen(port, () => {
        console.log(`server is running on port: ${port}`);
        
    })
}

startServer();
