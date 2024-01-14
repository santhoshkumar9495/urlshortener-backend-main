const express=require('express');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app=express();
const router = require('./routes/router');
const cookiParser = require("cookie-parser")
require("./db/conn");
const cors=require("cors");
const PORT=7000;




// app.get('/',(req,res)=>{}
//     res.status(200).json("server started");
// });

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router)


app.get('/',(req, res) => {
    res.send("Welcome to the url hsortner ")
})

app.use("/url", urlRoute);

app.get('/:shortId', async (res,req) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistry:{
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL)
});

app.listen(PORT,()=>
{

    console.log(`server startted running on port ${PORT}`);
});