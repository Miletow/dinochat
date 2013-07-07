function parse(message)
{
  if(message.match(/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/)){
    
    if(message.match(/.*png$|.*jpg$|.*gif$/)){
      return ('<img src="' + message +'" width="150">');
    }else{
      return ('<a href="' + message +'" target="_blank">' + message + '</a>');
    }
  }else{
    if(message == ":)"){
      return ('<img src="http://www.clemson.edu/fyd/Assets/images/smiley_face.gif" width="15">');
    }else{
      message = message.replace(/Lizard/, "DINOSAUR"); 
      message = message.replace(/lizard/, "DINOSAUR"); 
      message = message.replace(/Lizards/, "DINOSAURS"); 
      message = message.replace(/lizards/, "DINOSAURS"); 
    }
    return message;
  }
}