var db=require('../db/db.js');
var md5=require('md5');

exports.physicianLogin=function authenticate(req, res, next) {
  console.log("Login Body "+JSON.stringify(req.body));
  var body = req.body;
  if (!body.email || !body.password) {
    res.status(400).end('Must provide username or password');
  }

  var encrypted_password=md5(body.password);
  console.log("Encrypting Password "+encrypted_password);
  db.query("SELECT * FROM users where email=? and password=? and role='user' ",[req.body.email,encrypted_password],function(err, rows) {

       if(rows.length==0){
         console.log("User does not exist");
         res.status(401).end('Username or password incorrect');
       }else{
          req.body.username=rows[0].name;
          next();
       }
  });
}

exports.provisioningLogin=function authenticate(req, res, next) {
  console.log("Login Body "+JSON.stringify(req.body));
  var body = req.body;
  if (!body.email || !body.password) {
    res.status(400).end('Must provide username or password');
  }

  var encrypted_password=md5(body.password);
  console.log("Encrypting Password "+encrypted_password);
  db.query("SELECT * FROM users where email=? and password=? and role='admin' ",[req.body.email,encrypted_password],function(err, rows) {

       if(rows.length==0){
         console.log("User does not exist");
         res.status(401).end('Username or password incorrect');
       }else{
          req.body.username=rows[0].name;
          next();
       }
  });
}
