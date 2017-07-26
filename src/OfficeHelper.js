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