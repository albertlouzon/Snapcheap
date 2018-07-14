window.onload = function() {
    var messages=[];
    var users=[];
    var socket = io.connect('https://snapcheap.herokuapp.com/');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var errorMsg = document.getElementById("wrongInput")
    var html = '';
    var messageAudio = new Audio('/sounds/input.mp3')
    content.innerHTML = html;
    content.scrollTop = content.scrollHeight;

    socket.on('message', function (data) {
        isSameAuthor = false
        random = Math.floor(Math.random() * 7) //passer pas message i ou username
        if(data.message) {
            messages.push(data);
            
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += "<div class='messagesContainer'>" + "<b class='authors author"+ i +"' "  + ">" + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html +=  "<span class='messages'>" + messages[i].message  + "</span>"+ "</div>" + '<br /><br />';
             
               
            }
            content.innerHTML = html
            
      
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = sendMessage = function() {
        if(name.value == "") {
            errorMsg.innerHTML = 'Tell us who you are !' ;
        } else {
            if(field.value !== ""){
                messageAudio.play()
            }
            var text = field.value;
            var author = name.value;
            socket.emit('send', {message: text, username: author});
            errorMsg.innerHTML = '' ;
            field.value = "";
        }
    };

 
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    
    });

}

