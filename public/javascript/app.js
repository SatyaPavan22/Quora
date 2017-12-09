$(document).ready(function(){ 
    $("body").on("click",".answer-button",function(){
        $(this).next().show(400);
        $(this).addClass("disabled");
        initTinymce();
    }); 
 function initTinymce(){
    tinymce.init({
    selector: '#textaera',
    menubar: false,
    branding:false
    
    });
 }
    $("body").on("click",".follow-button",function(){
        var userName = $(this).val();
        $(this).text("Following");
        $(this).attr("disabled",true);
       $.post("/users/follow",{userName:userName},function(data){
/*           if(data == "Success"){
          $(this).text("Following");
           }*/
       });
    });
        $("body").on("click",".topic-follow-button",function(){
        var topicId = $(this).val();
        console.log(topicId);
        $(this).text("Following");
        $(this).attr("disabled",true);
       $.post("/topics/follow",{topicId:topicId},function(data){
/*           if(data == "Success"){
          $(this).text("Following");
           }*/
       });
    });
    $("body").on("click",".upvote-button",function() {
        $(this).text("Upvoted");
        $(this).attr("disabled",true);
        var answer = $(this).val();
        console.log(answer);
        $.post("/questions/upvote",{answerid:answer},function(data){
          
               
        });
    });
    
    $(".list-group li").click(function() {
        $(".list-group li").removeClass("active");
        $(this).addClass("active");
    });
    
    $("#questions").click(function() {
        var userId = this.getAttribute("value");
        console.log(userId);
       $.get("/users/"+userId,function(data){
           
           $("#blockspace").html("");
           $("#loadingmessage").show();
            $("#blockspace").append("<h4>"+ data.foundUser.questionsasked.length+ "&nbspQuestions</h4><hr>");
           data.foundUser.questionsasked.forEach(function(question){
               if(data.currentUser.answers.findIndex(x => x.question==question._id) == -1){
               $("#blockspace").append(
                "<div class='well answers'>"+
                "<h3><a href=/questions/"+question._id+">"+question.title+"</a></h3>"+
                "<p>Asked <i>"+question.asked.toString().substr(0,10)+"</i>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+question.answer.length+" Answers</p>"+
                "<button class='btn btn-primary answer-button'>Answer</button>"+ 
                  "<form  style='display:none'  class='form-group answer-form' method='POST' action=/questions/"+question._id+">"+
                    "<textarea  id='textaera' class='form-control' rows='6' name='answer' placeholder='write your answer'></textarea>"+
                "<input class='btn btn-primary' type='submit'>"+
                "</form>"+
                "</div>"
                  );
               }else{
                $("#blockspace").append(
                "<div class='well answers'>"+
                "<h3><a href=/questions/"+question._id+">"+question.title+"</a></h3>"+
                "<p>Asked <i>"+question.asked.toString().substr(0,10)+"</i>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+question.answer.length+" Answers</p>"+
                "<button class='btn btn-default answer-button disabled'>Answered</button>"+ 
                  "<form  style='display:none'  class='form-group answer-form' method='POST' action=/questions/"+question._id+">"+
                    "<textarea  id='textaera' class='form-control' rows='6' name='answer' placeholder='write your answer'></textarea>"+
                "<input class='btn btn-primary' type='submit'>"+
                "</form>"+
                "</div>"
                );
               }
           });
           
           $("#loadingmessage").hide();
           
       });
    });
    
    $("#followers").click(function() {
        var userId = this.getAttribute("value");
        console.log(userId);
       $.get("/users/"+userId,function(data){
           console.log(data);
           $("#blockspace").html("");
           $("#blockspace").append("<h4>"+ data.foundUser.followers.length+ "&nbspFollowers</h4><hr>");
           $("#blockspace").append("<div class='row'>");
           data.foundUser.followers.forEach(function(follower){
               if(data.currentUser.following.indexOf(follower._id) === -1 && data.currentUser._id != follower._id){
            $("#blockspace").append(
                "<div class='col-md-3 profile-show'>"+
                "<h4><img class='answer-profile-pic' src='/images/elliot.jpg'><a href=/users/"+follower._id+">"+follower.username+"</a></h4>"+
                "<br><br><br>"+
                "<buton class='btn btn-xs btn-primary'>Follow|"+follower.followers.length+"</button>"+
                "</div>"+
                "</div>"
                );}else{
                $("#blockspace").append(
                "<div class='col-md-3 profile-show'>"+
                "<h4><img class='answer-profile-pic' src='/images/elliot.jpg'><a href=/users/"+follower._id+">"+follower.username+"</a></h4>"+
                "<br><br><br>"+
                "<buton class='btn btn-xs btn-default' disabled>Following|"+follower.followers.length+"</button>"+
                "</div>"+
                "</div>");
                    
                }
               
           });
    });
 }); 
 
     $("#following").click(function() {
        var userId = this.getAttribute("value");
       $.get("/users/"+userId,function(data){
           $("#blockspace").html("");
           $("#blockspace").append("<h4>"+ data.foundUser.following.length+ "&nbspFollowers</h4><hr>");
           $("#blockspace").append("<div class='row'>");
           data.foundUser.following.forEach(function(following){
         if(data.currentUser.following.indexOf(following._id) === -1 && data.currentUser._id != following._id){
           $("#blockspace").append(
                "<div class='col-md-3 profile-show'>"+
                "<h4><img class='answer-profile-pic' src='/images/elliot.jpg'><a href=/users/"+following._id+">"+following.username+"</a></h4>"+
                "<br><br><br>"+
                "<buton class='btn btn-xs btn-primary'>Follow|"+following.followers.length+"</button>"+
                "</div>"+
                "</div>"+
                "</div>"
                );}else{
                              $("#blockspace").append(
                "<div class='col-md-3 profile-show'>"+
                "<h4><img class='answer-profile-pic' src='/images/elliot.jpg'><a href=/users/"+following._id+">"+following.username+"</a></h4>"+
                "<br><br><br>"+
                "<buton class='btn btn-xs btn-default' disabled>Following|"+following.followers.length+"</button>"+
                "</div>"+
                "</div>"+
                "</div>"
                ); 
                }
               
           });
        });
    }); 
    
    
    $("#topic-questions").click(function() {
       var topicId = this.getAttribute("value");
       $.get("/topics/"+topicId,function(data) {
                      $("#blockspace").html("");
           $("#blockspace").append("<h4>"+ data.questions.length+ "&nbspQuestions</h4><hr>");
           $("#blockspace").append("<div class='row'>");
           data.questions.forEach(function(question){
           $("#blockspace").append(
            "<div class='well answers'>"+
                "<p>Question Asked in       "+data.topic.name+"</p>"+
                 "<h3><a href='/questions/question._id'>"+question.title+"</a></h3>"+
                 "<p>"+question.answer.length+" Answers</p>"+
                "</div>"
                );
               
           });
       });
    });
    
    $(".comment").click(function() {
       $(this).next().next().toggle(300); 
       //$.post("comments/"+answerId)
    });
    $(".comment-post").click(function() {
        var buttondata = (this).getAttribute("value");
        var answerId = buttondata.substring(0,buttondata.indexOf("#"));
        var name = buttondata.substring(buttondata.indexOf("#")+1,buttondata.length);
       var commentText = $(this).prev().val();
       //console.log(answerId+" "+commentText);
      $("#"+answerId+"comments").prepend(                 "<div class='each-comment'>"+
                 "<img class='comment-image' src='/images/elliot.jpg'><strong>&nbsp&nbsp"+name+"</strong>"+
                 "<p class='comment-text'>"+commentText+"</p>"+
                 "</div>");
      $(".coment-form").hide();
      //$(".coment-form").setAtribute("value","");
       $.post("/comments/"+answerId,{commentText:commentText},function(data) {
           
       });
    });
    
    $(".coment-form").submit(function(e){
        e.preventDefault();
    });
    
    $(".allcomments").click(function() {
        var answerId = (this).getAttribute("value");
        $.get("/comments/"+answerId,function(data) {
           data.comments.forEach(function(comment){
              
             $("#"+answerId+"comments").append(
                 "<div class='each-comment'>"+
                 "<p><img class='comment-image' src='/images/elliot.jpg'><strong>&nbsp&nbsp"+comment.author.username+"</strong></p>"+
                 "<p class='comment-text'>"+comment.text+"</p>"+
                 "</div>"
             );
           });
        });
    });
    $(".register-username").on("input",function() {
        $(this).addClass("register-danger");
        
        if($(this).val().length>3){
        var userName = $(this).serialize();
        console.log(userName);
        $.get('/users?'+userName,function(data){
            console.log(data.foundUsers);
            if(!(data.foundUsers.length)){
                $(this).removeClass("register-danger");
                $(this).addClass("register-success");
            }
        });
        }
    });
    $(".register-password").click(function() {
       $(this).parent().next().show(); 
    });
    
});