import express from "express"
import bodyParser from "body-parser";
const app = express()
const port = 3000
var blogContent = [];
var blogtitle = [];
var blogNameSearched
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.get("/blogs",(req,res)=>{
    res.render("blogs.ejs")
})

app.post("/submit",(req,res)=>{
   if(req.body.title != ""){
    blogtitle.push(req.body.title)
    blogContent.push( req.body.blog)
   
    res.render("index.ejs",{status: "saved!"})
   }else{
    res.render("index.ejs",{status: "empty!"})
   }
})

app.post("/search",(req,res)=>{
    blogNameSearched = req.body.blog
    console.log(blogNameSearched)
    console.log(req.body)
    if(blogtitle.includes(blogNameSearched)){
    const index = blogtitle.indexOf(blogNameSearched);
    res.render("blogs.ejs",{ blogContents: blogContent,blogtitle: blogtitle, index: index})
    }else{
      res.render("index.ejs", {found: "Not found!"})
    }
})
app.get("/allBlogs",(req,res)=>{
  res.render("blogs.ejs",{ blogContents: blogContent,blogtitle: blogtitle, status: "all"})
})




app.listen(port, () => {
  console.log(`listening on port ${port}`)
})