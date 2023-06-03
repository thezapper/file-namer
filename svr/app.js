const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

let fileList;
app.get('/list', (req, res) => {
  //res.send({greet:"Hello World!"} )
  const folderPath = '../files';

  let dir = path.join(__dirname, folderPath);

  try 
  {
    if (fs.existsSync(dir)) 
    {
      fileList = fs.readdirSync(dir)

      // console.log("\nCurrent directory filenames:");
      // fileList.forEach(file => {
      //   console.log(file);
      // });

      res.json({files:fileList} )
    }  
    console.log("Files read");
  } 
  catch (err) 
  {
    res.json({error:"error"})
    console.log(err);
  }
});

app.post('/rename', (req, res) => {
  let params = req.body;
  console.log(params);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})