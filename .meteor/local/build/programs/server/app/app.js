var require = meteorInstall({"imports":{"api":{"items.js":["meteor/mongo",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/api/items.js                                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({                                                      // 1
  Items: function () {                                               // 1
    return Items;                                                    // 1
  }                                                                  // 1
});                                                                  // 1
var Mongo = void 0;                                                  // 1
module.importSync("meteor/mongo", {                                  // 1
  Mongo: function (v) {                                              // 1
    Mongo = v;                                                       // 1
  }                                                                  // 1
}, 0);                                                               // 1
var Items = new Mongo.Collection('items');                           // 3
///////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["../imports/api/items.js","meteor/meteor",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/main.js                                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.importSync("../imports/api/items.js");                        // 1
var Meteor = void 0;                                                 // 1
module.importSync("meteor/meteor", {                                 // 1
  Meteor: function (v) {                                             // 1
    Meteor = v;                                                      // 1
  }                                                                  // 1
}, 1);                                                               // 1
Meteor.startup(function () {// code to run on server at startup      // 5
});                                                                  // 7
///////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
