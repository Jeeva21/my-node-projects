const fs = require("fs");
// fs.writeFile("./message.txt","Hey Jeeva Welcome to NodeJs!", (err)=>{
//     if(err) throw err;
//     console.log("Thanks, File has been successfully saved.")
// })

fs.readFile("./message.txt", 'utf8', (err, data)=>{
    if(err) throw err;
    console.log(data);
})