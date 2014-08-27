;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['regularjs'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('regularjs'));
  } else {
    factory(root.jQuery);
  }

}(this, function(Regular) {

  var slice = Regular.util.slice;

  var util = function(){


    return {
      getAttrs: function(){
        
      }
    }
  }()



  var Hub = Regular.extend({
    scope: Component,
    init: function initHub(){
      var scope = this.scope;
      this.initComponents(scope._components);
    },
    _initComponents: function(components){
      var Component;
      for( var i in components ){
        Component = components[i];
        if( Component instanceof Regular){
          this.initComponent(i, Component);
        }
      }
    },
    _initComponent: function(name, Component){
      var container =  this.container || document.body;
      var nodes = slice.call( container.getElementsByTagName(name) );
      nodes.forEach(this.initTag.bind(this, Component));
    },
    _initTag: function(node, Component){
      var attrs = 
    }
  })




})

new Hub({
  scope: Component,
  data: {
    user: user,
    channels: channels,
  },
  router: {
    "/home/code": {
       
    }
  }
})
