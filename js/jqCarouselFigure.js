(function($, window, document, undefined) { 
  var pluginName = "jQueryCarousel";           // set default value
  var defaults = {
    data:[{
      url: "demo2.html",
      img: "./img/IMG_1.JPG"
    },{
      url: "demo2.html",
      img: "./img/IMG_2.JPG"
    },{
      url: "demo2.html",
      img: "./img/IMG_3.JPG"
    },{
      url: "demo2.html",
      img: "./img/IMG_4.JPG"
    },{
      url: "demo2.html",
      img: "./img/IMG_5.JPG"
    }]
  };


  function Plugin(element, options){         // set the plugin class
    this._element = element;
    this._settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init(this._defaults.data);
  }

  $.extend(Plugin.prototype, {               // merge to plugin prototpe
  	init: function(data){
      this.render(data);
      this.bindEvent(data);
  	},
    render: function(data){
      let imgLi = '',
          imgUl = '',
          switchUl = '',
          imgLength = data.length;             // for performance
      for(let i=0; i<imgLength; i++){
        switch(i){
          case 0:
            imgLi = "<li class='prev_ready'><img src="+ data[i].img +" alt=''/></li>";
            imgUl += imgLi;
            switchUl += "<li></li>";
            break;
          case 1:
            imgLi = "<li class='prev'><img src="+ data[i].img +" alt=''/></li>";
            imgUl += imgLi; 
            switchUl += "<li></li>";
            break;
          case 2:
            imgLi = "<li class='current'><img src="+ data [i].img +" alt=''/></li>";
            imgUl += imgLi;
            switchUl += "<li class='on'></li>";
            break;
          case 3:
            imgLi = "<li class='next'><img src="+ data[i].img +" alt=''/></li>";
            imgUl += imgLi; 
            switchUl += "<li></li>";
            break;
          case 4:
            imgLi = "<li class='next_ready'><img src="+ data[i].img +" alt=''/></li>";
            imgUl += imgLi; 
            switchUl += "<li></li>";
            break;
        }
      }
      $(".carousel_list").append("<ul>"+ imgUl +"</ul>");
      $(".switch_list").append("<ul>"+ switchUl +"</ul>");
    },
  	bindEvent: function(data){ 
  	  let $img_li = $(".carousel_list li");
      let $switch_li = $(".switch_list li");
      $img_li.on("click", this.switchPic.bind(this));           // callback just need method's name  
      $switch_li.on("mouseover", this.switchLi.bind(this));     // bind plugin on this to method     
  	},
    switchPic: function(event){
      let $position = $(event.currentTarget);
      let n = 0;
      switch($position.prop("className")){
        case "current":
          window.location = this._defaults.data[2].url;
          break;
        case "prev_ready":
          $(".next").attr({"class":"prev_ready"});
          $(".prev").attr({"class":"next"});
          $(".next_ready").attr({"class":"prev"});
          $(".current").attr({"class":"next_ready"});
          $position.attr({"class":"current"});
          this.activeLi($position);
          break;
        case "prev":
          $(".prev_ready").attr({"class": "prev"});
          $(".next_ready").attr({"class":"prev_ready"});
          $(".next").attr({"class":"next_ready"});
          $(".current").attr({"class":"next"});
          $position.attr({"class":"current"});
          this.activeLi($position);
          break;
        case "next":
          $(".next_ready").attr({"class":"next"});
          $(".prev_ready").attr({"class":"next_ready"});
          $(".prev").attr({"class":"prev_ready"});
          $(".current").attr({"class":"prev"});
          $position.attr({"class":"current"});
          this.activeLi($position);
          break;
        case "next_ready":
          $(".prev").attr({"class":"next_ready"});
          $(".next").attr({"class":"prev"});
          $(".prev_ready").attr({"class":"next"});
          $(".current").attr({"class":"prev_ready"});
          $position.attr({"class":"current"});
          this.activeLi($position);
          break;
      }
    },
    switchLi: function(event){
      let $position = $(event.currentTarget);
      console.log($position[0]);
      switch($position[0]){
        case $(".switch_list ul li:eq(0)")[0]:
          $(".carousel_list ul li:eq(0)").attr({"class":"current"});
          $(".carousel_list ul li:eq(1)").attr({"class":"next"});
          $(".carousel_list ul li:eq(2)").attr({"class":"next_ready"});
          $(".carousel_list ul li:eq(3)").attr({"class":"prev_ready"});
          $(".carousel_list ul li:eq(4)").attr({"class":"prev"});
          this.activeLi($position);
          break;
        case $(".switch_list ul li:eq(1)")[0]:
          $(".carousel_list ul li:eq(0)").attr({"class":"prev"});
          $(".carousel_list ul li:eq(1)").attr({"class":"current"});
          $(".carousel_list ul li:eq(2)").attr({"class":"next"});
          $(".carousel_list ul li:eq(3)").attr({"class":"next_ready"});
          $(".carousel_list ul li:eq(4)").attr({"class":"prev_ready"});
          this.activeLi($position);
          break;
        case $(".switch_list ul li:eq(2)")[0]:
          $(".carousel_list ul li:eq(0)").attr({"class":"prev_ready"});
          $(".carousel_list ul li:eq(1)").attr({"class":"prev"});
          $(".carousel_list ul li:eq(2)").attr({"class":"current"});
          $(".carousel_list ul li:eq(3)").attr({"class":"next"});
          $(".carousel_list ul li:eq(4)").attr({"class":"next_ready"});
          this.activeLi($position);
          break;
        case $(".switch_list ul li:eq(3)")[0]:
          $(".carousel_list ul li:eq(0)").attr({"class":"next_ready"});
          $(".carousel_list ul li:eq(1)").attr({"class":"prev_ready"});
          $(".carousel_list ul li:eq(2)").attr({"class":"prev"});
          $(".carousel_list ul li:eq(3)").attr({"class":"current"});
          $(".carousel_list ul li:eq(4)").attr({"class":"next"});
          this.activeLi($position);
          break;
        case $(".switch_list ul li:eq(4)")[0]:
          $(".carousel_list ul li:eq(0)").attr({"class":"next"});
          $(".carousel_list ul li:eq(1)").attr({"class":"next_ready"});
          $(".carousel_list ul li:eq(2)").attr({"class":"prev_ready"});
          $(".carousel_list ul li:eq(3)").attr({"class":"prev"});
          $(".carousel_list ul li:eq(4)").attr({"class":"current"});
          this.activeLi($position);
          break;
      }
    },
    activeLi: function(p){
      let $position = p;
      switch($position[0]){
        case $(".carousel_list ul li:eq(0)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(0)").addClass("on");
          break;
        case $(".carousel_list ul li:eq(1)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(1)").addClass("on");
          break;
        case $(".carousel_list ul li:eq(2)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(2)").addClass("on");
          break;
        case $(".carousel_list ul li:eq(3)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(3)").addClass("on");
          break;
        case $(".carousel_list ul li:eq(4)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(4)").addClass("on");
          break;
        case $(".switch_list ul li:eq(0)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(0)").addClass("on");
          break;
        case $(".switch_list ul li:eq(1)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(1)").addClass("on");
          break;
        case $(".switch_list ul li:eq(2)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(2)").addClass("on");
          break;
        case $(".switch_list ul li:eq(3)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(3)").addClass("on");
          break;
        case $(".switch_list ul li:eq(4)")[0]:
          $(".switch_list ul li").removeClass("on");
          $(".switch_list ul li:eq(4)").addClass("on");
          break;
      }
    }
  });

  $.fn[pluginName] = function(options){             // add function to jquery.prototype
    var plugin = new Plugin(this, options);
    return this;
  };


})(jQuery, window, document);