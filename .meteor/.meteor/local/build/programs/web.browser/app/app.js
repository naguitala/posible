var require = meteorInstall({"imports":{"ui":{"body.html":["./template.body.js",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/ui/body.html                                                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.exports = require("./template.body.js");                                                                 // 1
                                                                                                                // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"template.body.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/ui/template.body.js                                                                                  //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
                                                                                                                // 1
Template.body.addContent((function() {                                                                          // 2
  var view = this;                                                                                              // 3
  return HTML.DIV({                                                                                             // 4
    class: "container"                                                                                          // 5
  }, "\n    ", HTML.HEADER("\n      ", HTML.H1("Inventory (", Blaze.View("lookup:incompleteCount", function() {
    return Spacebars.mustache(view.lookup("incompleteCount"));                                                  // 7
  }), ")"), "\n\n      ", HTML.Raw('<label class="hide-completed">\n        <input type="checkbox">\n        Hide Completed Items\n      </label>'), "\n\n      ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));                                                          // 9
  }, function() {                                                                                               // 10
    return [ "\n        ", HTML.FORM({                                                                          // 11
      class: "new-item"                                                                                         // 12
    }, "\n          ", HTML.INPUT({                                                                             // 13
      type: "text",                                                                                             // 14
      name: "text",                                                                                             // 15
      placeholder: "Type to add new items"                                                                      // 16
    }), "\n        "), "\n      " ];                                                                            // 17
  }), "\n    "), "\n\n    ", HTML.UL("\n      ", Blaze.Each(function() {                                        // 18
    return Spacebars.call(view.lookup("items"));                                                                // 19
  }, function() {                                                                                               // 20
    return [ "\n        ", Spacebars.include(view.lookupTemplate("item")), "\n      " ];                        // 21
  }), "\n    "), "\n  ");                                                                                       // 22
}));                                                                                                            // 23
Meteor.startup(Template.body.renderToDocument);                                                                 // 24
                                                                                                                // 25
Template.__checkName("item");                                                                                   // 26
Template["item"] = new Template("Template.item", (function() {                                                  // 27
  var view = this;                                                                                              // 28
  return HTML.LI(Blaze.View("lookup:text", function() {                                                         // 29
    return Spacebars.mustache(view.lookup("text"));                                                             // 30
  }));                                                                                                          // 31
}));                                                                                                            // 32
                                                                                                                // 33
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"body.js":["meteor/meteor","meteor/templating","meteor/reactive-dict","../api/items.js","./body.html",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/ui/body.js                                                                                           //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var Meteor = void 0;                                                                                            // 1
module.importSync("meteor/meteor", {                                                                            // 1
  Meteor: function (v) {                                                                                        // 1
    Meteor = v;                                                                                                 // 1
  }                                                                                                             // 1
}, 0);                                                                                                          // 1
var Template = void 0;                                                                                          // 1
module.importSync("meteor/templating", {                                                                        // 1
  Template: function (v) {                                                                                      // 1
    Template = v;                                                                                               // 1
  }                                                                                                             // 1
}, 1);                                                                                                          // 1
var ReactiveDict = void 0;                                                                                      // 1
module.importSync("meteor/reactive-dict", {                                                                     // 1
  ReactiveDict: function (v) {                                                                                  // 1
    ReactiveDict = v;                                                                                           // 1
  }                                                                                                             // 1
}, 2);                                                                                                          // 1
var Items = void 0;                                                                                             // 1
module.importSync("../api/items.js", {                                                                          // 1
  Items: function (v) {                                                                                         // 1
    Items = v;                                                                                                  // 1
  }                                                                                                             // 1
}, 3);                                                                                                          // 1
module.importSync("./body.html");                                                                               // 1
Template.body.onCreated(function () {                                                                           // 10
  function bodyOnCreated() {                                                                                    // 10
    this.state = new ReactiveDict();                                                                            // 11
  }                                                                                                             // 12
                                                                                                                //
  return bodyOnCreated;                                                                                         // 10
}());                                                                                                           // 10
Template.body.helpers({                                                                                         // 14
  items: function () {                                                                                          // 15
    var instance = Template.instance();                                                                         // 16
                                                                                                                //
    if (instance.state.get('hideCompleted')) {                                                                  // 17
      // If hide completed is checked, filter items                                                             // 18
      return Items.find({                                                                                       // 19
        checked: {                                                                                              // 19
          $ne: true                                                                                             // 19
        }                                                                                                       // 19
      }, {                                                                                                      // 19
        sort: {                                                                                                 // 19
          createdAt: -1                                                                                         // 19
        }                                                                                                       // 19
      });                                                                                                       // 19
    } // Show newest items at the top                                                                           // 20
                                                                                                                //
                                                                                                                //
    return Items.find({}, {                                                                                     // 22
      sort: {                                                                                                   // 22
        createdAt: -1                                                                                           // 22
      }                                                                                                         // 22
    });                                                                                                         // 22
  },                                                                                                            // 23
  incompleteCount: function () {                                                                                // 24
    return Items.find({                                                                                         // 25
      checked: {                                                                                                // 25
        $ne: true                                                                                               // 25
      }                                                                                                         // 25
    }).count();                                                                                                 // 25
  }                                                                                                             // 26
});                                                                                                             // 14
Template.body.events({                                                                                          // 29
  'submit .new-item': function (event) {                                                                        // 30
    // Prevent default browser form submit                                                                      // 31
    event.preventDefault(); // Get value from form element                                                      // 32
                                                                                                                //
    var target = event.target;                                                                                  // 35
    var text = target.text.value; // Insert an item into the collection                                         // 36
                                                                                                                //
    Items.insert({                                                                                              // 39
      text: text,                                                                                               // 40
      createdAt: new Date(),                                                                                    // 41
      // current time                                                                                           // 41
      owner: Meteor.userId(),                                                                                   // 42
      username: Meteor.user().username                                                                          // 43
    }); // Clear form                                                                                           // 39
                                                                                                                //
    target.text.value = '';                                                                                     // 47
  },                                                                                                            // 48
  'change .hide-completed input': function (event, instance) {                                                  // 49
    instance.state.set('hideCompleted', event.target.checked);                                                  // 50
  }                                                                                                             // 51
});                                                                                                             // 29
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"api":{"items.js":["meteor/mongo",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/api/items.js                                                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.export({                                                                                                 // 1
  Items: function () {                                                                                          // 1
    return Items;                                                                                               // 1
  }                                                                                                             // 1
});                                                                                                             // 1
var Mongo = void 0;                                                                                             // 1
module.importSync("meteor/mongo", {                                                                             // 1
  Mongo: function (v) {                                                                                         // 1
    Mongo = v;                                                                                                  // 1
  }                                                                                                             // 1
}, 0);                                                                                                          // 1
var Items = new Mongo.Collection('items');                                                                      // 3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"startup":{"accounts-config.js":["meteor/accounts-base",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/startup/accounts-config.js                                                                           //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var Accounts = void 0;                                                                                          // 1
module.importSync("meteor/accounts-base", {                                                                     // 1
  Accounts: function (v) {                                                                                      // 1
    Accounts = v;                                                                                               // 1
  }                                                                                                             // 1
}, 0);                                                                                                          // 1
Accounts.ui.config({                                                                                            // 3
  passwordSignupFields: 'USERNAME_ONLY'                                                                         // 4
});                                                                                                             // 3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"client":{"main.js":["../imports/startup/accounts-config.js","../imports/ui/body.js",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// client/main.js                                                                                               //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.importSync("../imports/startup/accounts-config.js");                                                     // 1
module.importSync("../imports/ui/body.js");                                                                     // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".html",".css"]});
require("./client/main.js");