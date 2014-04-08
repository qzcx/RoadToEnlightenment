var catan = catan || {};
catan.models = catan.models || {};
catan.models.chat = catan.models.chat || {};

catan.models.chat.Log = (function() {

  /**
    The model class for Log 
    <pre>      
    Domain:
    JSON: This should contain array list of the messages
    POST: array of object catan.models.chat.Message
    </pre>

    @class catan.models.chat.Log
    @constructor
    
    @param {json} messages A list of objects with source(the player name attached to the event), 
    message(the contents of the line)
  */

  function Log(json){
    this.messages = [];
   
    for (var i = 0, len = json.lines.length; i < len; i++){
      this.addMessage(json.lines[i]);
    }
  }
  
  /**
    Returns the array of messages 
    <pre>
    PRE: None
    </pre>
     
    @method getmessages
    @return {array} The array of message objects   
  */
  Log.prototype.getMessages = function() {
    return this.messages;
  };
  
  /**
    Add a message object to array of messages
    <pre>
      PRE: line, json object include source, message and className
   </pre>

    @method addMessage
    @param {object} message object which contain message and source 
  */
  Log.prototype.addMessage = function (line) {
    this.messages.push(new catan.models.chat.Message(line));
  };
    
  /**
    Returns the message objects for given source 
    <pre>
      PRE: !isNaN(source)
    </pre>
       
    @method getMessage
    @return {object } message object which contain message and source for given source 
  */
  Log.prototype.getMessage = function (source) {
    var msgs = [];
    for (var i = 0; i < this.messages.length; i++) {
      if (this.messages[i].getSource == source){
         msgs.push(this.messages[i]);
      }
    }
    return msgs;
  };
  
  return Log;
})();

