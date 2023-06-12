const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/build')))
let buildPath = path.join(__dirname, '../../client/build');
console.log(buildPath);

app.get('/', (req, res) => 
{
  console.log(__dirname);
  res.sendFile('index.html');
});

let fileList;
app.get('/list', (req, res) => {
  //res.send({greet:"Hello World!"} )
  const folderPath = '../../files';

  let dir = path.join(__dirname, folderPath);

  try 
  {
    if (fs.existsSync(dir)) 
    {
      fileList = fs.readdirSync(dir, { withFileTypes: true })

      const filesNames = fileList
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
      // console.log("\nCurrent directory filenames:");
      // fileList.forEach(file => {
      //   console.log(file);
      // });

      res.json({files:filesNames} )
    }  
    console.log("Files read");
  } 
  catch (err) 
  {
    res.json({error:"error"})
    console.log(err);
  }
});

app.post('/set-file-dir', (req, res) => {
  let params = req.body;
  console.log(params);

  const folderPath = '../../files/';
  let dir = path.join(__dirname, folderPath);

});

app.post('/rename', (req, res) => {
  let params = req.body;
  console.log(params);

  const folderPath = '../../files/';
  let dir = path.join(__dirname, folderPath);

  fs.renameSync(dir + params.orgName, dir + params.newName);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})