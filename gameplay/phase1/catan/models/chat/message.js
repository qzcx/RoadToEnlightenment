var catan = catan || {};
catan.models = catan.models || {};
catan.models.chat = catan.models.chat || {};

catan.models.chat.Message = (function() {

  /**
    The model class for the message Message of Chad  
    <pre>      
    Domain:

      source: The player name attached to chat, string
      message: Chat message, String
      
    Constructor Specification:
        PRE: !isNaN(messasge)
        PRE: !isNaN(source)
        POST: getMessage() == message - log message
        POST: getSource() == source - player's name
        POST: getClassName()  = className -player'scolor
    </pre>

    @class Message
    @constructor
    
    @param {object} line object incuse source, message and class name.
 */
  function Message(line) {
    this.source = line.source;
    this.message = line.message;  
    this.className = line.className;
  }
  
  /**
    Returns the message 
    <pre>
    PRE: None
    </pre>
     
    @method getMessage
    @return {String } The chat message   
  */
  Message.prototype.getMessage = function() {
    return this.message;
  };

  
  /**
    Returns the source, the player's name  
    <pre>
    PRE: None
    </pre>
     
    @method getSource
    @return {String } The player's name   
  */
  Message.prototype.getSource = function() {
    return this.source;
  };

  /**
    Returns the className, the player's color 
    <pre>
    PRE: None
    </pre>
     
    @method getClassName
    @return {String } className  
  */
  Message.prototype.getClassName = function() {
    return this.className;
  };
  
  return Message;
})();