
// modal to create post
var createPostLink1 = document.getElementById('createlink1');
var createPostLink2 = document.getElementById('createlink2');
var  popup = document.getElementById('popup');

createPostLink1.addEventListener('click', function(){
    popup.style.display = "block";
    popup.style.opacity = "1";

});

createPostLink2.addEventListener('click', function(){
    popup.style.display = "block";
    popup.style.opacity = "1";
});

var closebtn  = document.getElementById('close');
closebtn.addEventListener('click',function(){
    popup.style.display = "none";
});


