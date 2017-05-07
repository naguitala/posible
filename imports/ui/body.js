import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Items } from '../api/items.js';

//import './item.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  items() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter items
      return Items.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Show newest items at the top
    return Items.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Items.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-item'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert an item into the collection
    Items.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
