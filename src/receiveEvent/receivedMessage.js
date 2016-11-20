/*
* Message Event
*
* This event is called when a message is sent to your page. The 'message'
* object format can vary depending on the kind of message that was received.
* Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
*
* For this example, we're going to echo any text that we get. If we get some
* special keywords ('button', 'generic', 'receipt'), then we'll send back
* examples of those bubbles to illustrate the special message bubbles we've
* created. If we receive a message with an attachment (image, video, audio),
* then we'll simply confirm that we've received the attachment.
*

receivedMessage

*/

const {
  sendImageMessage,
  sendGifMessage,
  sendAudioMessage,
  sendVideoMessage,
  sendFileMessage,
  sendButtonMessage,
  sendGenericMessage,
  sendReceiptMessage,
  sendQuickReply,
  sendReadReceipt,
  sendTypingOn,
  sendTypingOff,
  sendAccountLinking,
  sendTextMessage,
  processAndSendTextMessage,
} = require('../sendAction/');


module.exports = (event) => {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  // console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
  // console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    // Just logging message echoes to console
    // console.log("Received echo for message %s and app %d with metadata %s", messageId, appId, metadata);
    return;
  } else if (quickReply) {
    const quickReplyPayload = quickReply.payload;
    // console.log("Quick reply for message %s with payload %s", messageId, quickReplyPayload);

    sendTextMessage(senderID, "Quick reply tapped");
    return;
  }

  if (messageText) {
    switch (messageText) {
      case 'image':
      sendImageMessage(senderID);
      break;

      case 'gif':
      sendGifMessage(senderID);
      break;

      case 'audio':
      sendAudioMessage(senderID);
      break;

      case 'video':
      sendVideoMessage(senderID);
      break;

      case 'file':
      sendFileMessage(senderID);
      break;

      case 'button':
      sendButtonMessage(senderID);
      break;

      case 'generic':
      sendGenericMessage(senderID);
      break;

      case 'receipt':
      sendReceiptMessage(senderID);
      break;

      case 'quick reply':
      sendQuickReply(senderID);
      break;

      case 'read receipt':
      sendReadReceipt(senderID);
      break;

      case 'typing on':
      sendTypingOn(senderID);
      break;

      case 'typing off':
      sendTypingOff(senderID);
      break;

      case 'account linking':
      sendAccountLinking(senderID);
      break;

      default:
      processAndSendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}
