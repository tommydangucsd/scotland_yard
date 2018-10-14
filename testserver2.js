const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
app.get('/api',(req,res) => {
    //res.sendFile(__dirname+'/public/index.html');
    console.log("JFIOEWJIF");
    
    res.send({express: 'Hello!'});
});


app.listen(port, () => console.log(`Listening on port ${port}`));