const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express()
const port = 3000

app.use(cors());

app.get('/hello', (req, res) => {
  //res.send({greet:"Hello World!"} )
  const folderPath = '../files';

  let dir = path.join(__dirname, folderPath);

  try 
  {
    if (fs.existsSync(dir)) 
    {
      let fileList = fs.readdirSync(dir)

      // console.log("\nCurrent directory filenames:");
      // fileList.forEach(file => {
      //   console.log(file);
      // });

      res.json({files:fileList} )
    }  
    console.log(dir);
  } 
  catch (err) 
  {
    res.json({error:"error"})
    console.log(err);
  }


  //res.json({greet:"Hello World!"} )
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})