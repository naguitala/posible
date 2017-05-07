import { Template } from 'meteor/templating';

import { Items } from '../api/items.js';

import './item.html';

Template.item.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Items.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Items.remove(this._id);
  },
});
