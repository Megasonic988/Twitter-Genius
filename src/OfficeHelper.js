const Office = window.Office;
const Word = window.Word;

/**
 * Get the text in the body of the Word document. 
 */
export function getBodyContent() {
  return Word.run(function (context) {
    const body = context.document.body;
    context.load(body, 'text');
    return context.sync()
      .then(function () {
        return body.text;
      });
  });
}

/**
 * Get the text current selected (i.e. highlighted)
 */
export function getSelectedText() {
  return Word.run(function (context) {
    const selection = context.document.getSelection();
    context.load(selection);
    return context.sync()
      .then(function () {
        return selection.text;
      })
  });
}

/**
 * Get the paragraph that the I-cursor is currently in.
 */
export function getCurrentParagraph() {
  return Word.run(function (context) {
    const paragraph = context.document.getSelection().paragraphs.getFirst();
    context.load(paragraph);
    return context.sync()
      .then(function () {
        return paragraph.text;
      })
  });
}

/**
 * Get the sentence that the I-cursor is currently in.
 */
export function getCurrentSentence() {
  return Word.run(function (context) {
    var sentences = context.document.getSelection().getTextRanges(["."], false);
    context.load(sentences);
    return context.sync()
      .then(function () {
        return sentences.items[0].text;
      });
  });
}

export function addSelectionChangedEventHandler(cb) {
  Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, function () {
    if (cb) cb();
  });
}

// function setup() {
//     Word.run(function (context) {
//         // lets insert a couple of paragraphs to illustrate the point..
//         context.document.body.clear();
//         context.document.body.insertParagraph("Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document.", "start");
//         context.document.body.paragraphs.getLast().insertText("To make your document look professionally produced, Word provides header, footer, cover page, and text box designs that complement each other. For example, you can add a matching cover page, header, and sidebar. Click Insert and then choose the elements you want from the different galleries.", "replace");
//         return context.sync()
//             .then(function () {
//                 context.document.body.paragraphs.getFirst().alignment = "left";
//                 context.document.body.paragraphs.getLast().alignment = "left";
//                 return context.sync();
//             })
//     })
//         .catch(OfficeHelpers.Utilities.log);
// }