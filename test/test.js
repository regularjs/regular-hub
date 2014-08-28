void function(){
  window.Pager = Regular.extend({
    name: 'pager',
    template: 
     "<div class='m-page {{clazz}}'>\
         <a  href='#' on-click={{ this.nav(current-1)}} class='pageprv {{current==1? \"z-dis\": \"\"}}'>上一页</a>\
          {{#if total - 5 > show * 2}}\
            <a href='#' on-click={{ this.nav(1)}} class={{current==1? 'z-crt': ''}}>1</a>\
            {{#if begin > 2}}<i>...</i>{{/if}}\
            {{#list begin..end as i}}\
            <a href='#'on-click={{ this.nav(i)}} class={{current==i? 'z-crt': ''}} >{{i}}</a>\
            {{/list}}\
            {{#if (end < total-1)}}\
             <i>...</i>\
            {{/if}}\
           <a href='#' on-click={{this.nav(total)}} class={{current==total? 'z-crt':''}}>{{total}}</a>\
          {{#else}}\
            {{#list 1..total as i}}\
              <a href='#' on-click={{ this.nav(i)}}  class={{current==i? 'z-crt': ''}}>{{i}}</a>\
            {{/list}}\
          {{/if}}\
        <a href='#' on-click={{this.nav(current + 1)}}  class='pagenxt {{current == total? \"z-dis\": \"\"}}'>下一页</a>\
      </div>",
    // before init
    config: function(data){
      var count =  5;
      var show = data.show = Math.floor( count/2 );
      data.current = data.current || 1;
      data.total = data.total || 1;

      this.$watch(['current', 'total'], function( current, total ){
        data.begin = current - show;
        data.end = current + show;
        if(data.begin < 2) data.begin = 2;
        if(data.end > data.total-1) data.end = data.total-1;
        if(current-data.begin <= 1) data.end = data.end + show + data.begin- current;
        if(data.end - current <= 1) data.begin = data.begin-show-current+ data.end;
      });
    },
    nav: function(page){
      var data = this.data;
      if(page < 1) return;
      if(page > data.total) return;
      if(page === data.current) return;
      data.current = page;
      this.$emit('nav', page);
    }
  })
}();


var Todo = Regular.extend({
  data: {todo: {}},
  name: "todo",
  template: "#todo"
});


var TodoMVC = Regular.extend({
    name: "todomvc",
    template: '#todomvc', // id | template string | preparsed ast
    // get the list;
      computed: {
      completedLength: "this.getList('completed').length",
      activeLength: "this.getList('active').length",
      allCompleted: {
        get: function(data){
          return data.todos.length === this.getList('completed').length
        },
        set: function(sign,data){
          data.todos.forEach(function(item){
            item.completed = sign;
          })
        }
      }
    },
    getList: function(filter){
      var list;
      if(!filter || filter === 'all') list= this.data.todos;
      else list = this.data.todos.filter(function(item){
        return filter === 'completed'? item.completed : !item.completed;
      });
      return list.slice((this.data.current-1) * 5, this.data.current * 5)
    },
    // toggle all todo's completed state
    toggleAll: function(sign){
      this.data.todos.forEach(function(item){
        return item.completed = !sign;
      });
    },
    // clear all compleled
    clearCompleted: function(){
      this.data.todos = this.data.todos.filter(function(item){
        return !item.completed
      });
    },
    // create a new todo
    newTodo: function(editTodo){
      var data = this.data;
      data.todos.unshift({description: editTodo});
      data.editTodo = "";
    }
})
var todos = [
    {completed: true, description: "sleep" },
    {completed: false, description: "work" }
]




var app = new ReHub({
  data: {
    user: [],
    channels: [],
    current:1,
    todos: todos
  },
  router: {
    "/home/code": {
       
    }
  }
})

app.$on("nav", function(page){
  console.log(page);
})
