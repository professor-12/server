"use strict";



(function stringGen(){
  var text = "";
  
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+!~";
  for (var i = 0; i < 200; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  console.log(text);
})()

 