$(document).ready(function(){
    
    $("#question-topic").keypress(function(){
        var search = $(this).serialize();
        console.log(search);
  if(search != "topic="){
    $.get('/topics?' + search, function(data) {
    $('#topics').html('');
        data.topics.forEach(function(topic){
            $("#topics").append("<option>"+ topic.name+"<option>");
        });
    });
  }else{
    $("#topics").empty();
    }
});

  $(".user-search-box").on("input",function(){
     var searchResult = $(this).serialize();
     console.log(searchResult);
         $.get('/users?'+searchResult,function(data){
            $("#profilecontainer").html('');
            data.foundUsers.forEach(function(user){
                if(data.currentUser.following.indexOf(user._id)===-1 && user._id != data.currentUser._id){
               $("#profilecontainer").append(
                 "<div class='col-md-3'>"+
                 "<div class='profile-show'>"+
                     "<img class='answer-profile-pic' src='/images/elliot.jpg'>"+
            "<h3><a href=/users/"+user._id+">"+user.username+"</a></h3>"+
            "<p>"+user.about+"</p>"+
            "<button class='btn btn-primary follow-button' value="+user.username+">Follow|"+user.followers.length+"</button>"+
            "</div>"+
            "</div>");
                }else{
            $("#profilecontainer").append(
                 "<div class='col-md-3'>"+
                 "<div class='profile-show'>"+
                     "<img class='answer-profile-pic' src='/images/elliot.jpg'>"+
            "<h3><a href=/users/"+user._id+">"+user.username+"</a></h3>"+
            "<p>"+user.about+"</p>"+
            "<button class='btn btn-default follow-button' value="+user.username+" disabled>Following|"+user.followers.length+"</button>"+
            "</div>"+
            "</div>");
                }
            });
         });
  });
  
    $(".topic-search-box").on("input",function(){
     var searchResult = $(this).serialize();
     console.log(searchResult);
         $.get('/topics?'+searchResult,function(data){
            $("#profilecontainer").html('');
            data.topics.forEach(function(topic){
                if(data.currentUser.topicsfollowed.indexOf(topic._id)===-1){
               $("#profilecontainer").append(
                 "<div class='col-md-3'>"+
                 "<div class='profile-show'>"+
            "<h3><a href=/topics/"+topic._id+">"+topic.name+"</a></h3>"+
            "<button class='btn btn-primary follow-button' value="+topic.name+">Follow|"+topic.followers+"</button>"+
            "</div>"+
            "</div>");
                }else{
            $("#profilecontainer").append(
                 "<div class='col-md-3'>"+
                 "<div class='profile-show'>"+
            "<h3><a href=/users/"+topic._id+">"+topic.name+"</a></h3>"+
            "<button class='btn btn-default follow-button' value="+topic.name+" disabled>Following|"+topic.followers+"</button>"+
            "</div>"+
            "</div>");
                }
            });
         });
  });
});