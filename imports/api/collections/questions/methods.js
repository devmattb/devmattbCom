import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Meteor.methods({

  // Add a Question
  'questions.insert'(text) {
    check(text, String);

    Questions.insert({
      text,
      likes: 0,
      createdAt: new Date(),
    });
  },

  // Remove a Question
  'questions.remove'(qId) {
    check(qId, String);

    Questions.remove(qId);
  },

  // Answer a Question
  'questions.answer'(qId, ans) {
    check(ans, String);

    Questions.update(
      qId,
      {$set: {answer: ans, answeredAt: new Date()}}
    );
  },

  // Like/Unlike a Q/A Post:
  'questions.like'(qId, liked) {
    check(liked, Boolean);
    var addNum = (liked) ? 1 : -1;
    Questions.update(
      qId,
      {$inc: {likes: addNum}},
      function(error, res) {
        if (error) {
          console.log("Like ERROR: "+error);
        }
      }
    );
  },

  // Delete a Question
  'questions.delete'(qId) {
    Questions.remove(qId);
  },

  // Pin a Question to FAQ
  'questions.pin'(qId, pinned) {
    Questions.update(
      qId,
      {$set: {pinned: pinned}}
    );
  },

});
