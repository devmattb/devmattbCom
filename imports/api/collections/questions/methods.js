import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Meteor.methods({

  // Add a Question
  'questions.insert'(text) {
    check(text, String);

    Questions.insert({
      text,
      createdAt: new Date(),
    });
  },

  // Remove a Question
  'questions.remove'(qId) {
    check(qId, String);

    Questions.remove(qId);
  },

  // Answer a Question
  'questions.update'(qId, ans) {
    check(ans, String);

    Questions.update(
      qId,
      {$set: {answer: ans, answeredAt: new Date()}}
    );
  },

});
