function Carousel(options){
  this.target = options.target;
  this.data = options.data;
  this.queue = ["prev_ready","prev","current","next","next_ready"];
  this.init(this.data);
}

Carousel.prototype = {
  constructor: Carousel,
  init: function(data){
    this.render(data);
    this.bindEvent();
  },
  render: function(data){
        let imgUl = '',
        imgLi = '',
        switchUl = '',
        imgLength = data.length;
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
    document.getElementsByClassName("carousel_list")[0].innerHTML = "<ul>"+ imgUl +"</ul>";
    document.getElementsByClassName("switch_list")[0].innerHTML = "<ul>"+ switchUl +"</ul>";
  },
  bindEvent: function(){
    let imgList = document.getElementsByClassName("carousel_list");
    let switchList = document.getElementsByClassName("switch_list")[0].childNodes[0].childNodes;
    console.log(switchList);
    imgList[0].addEventListener("click", this.switchClick.bind(this));
    for(let i=0; i<switchList.length; i++){
      switchList[i].addEventListener("mouseover", this.switchHover.bind(this));
    }
  },
  switchClick: function(event){
    let position = event.target.parentNode.className;
    let arr = this.queue;
    console.log(position);
    switch(position){
      case "current":
        window.location = this.data[2].url;
        break;
      case "prev":
        var temp = arr.shift();
        arr.push(temp);
        this.switchPic();
        this.switchActive();
        break;
      case "next":
        temp = arr.pop();
        arr.unshift(temp);
        this.switchPic();
        this.switchActive();
        break;
    }
    return this;
  },
  switchHover: function(event){
    console.log("hover")
    var index = 0;
    let arr = this.queue;
    let activeLi = event.currentTarget;
    let children = document.getElementsByClassName("switch_list")[0].childNodes[0].childNodes;
    for(let i=0; i<arr.length; i++){
      if(activeLi === children[i]){
        index = i;
      }     
    }
    switch(index){
      case 0:
        this.queue = ["current","next","next_ready","prev_ready","prev"];
        this.switchPic();
        this.switchActive();
        break;
      case 1:
        this.queue = ["prev","current","next","next_ready","prev_ready"];
        this.switchPic();
        this.switchActive();
        break;
      case 2:
        this.queue = ["prev_ready","prev","current","next","next_ready"];
        this.switchPic();
        this.switchActive();
        break;
      case 3:
        this.queue = ["next_ready","prev_ready","prev","current","next"];
        this.switchPic();
        this.switchActive();
        break;
      case 4:
        this.queue = ["next","next_ready","prev_ready","prev","current"];
        this.switchPic();
        this.switchActive();
        break;
    }
  },
  switchPic: function(){
    let arr = this.queue;
    let children = document.getElementsByClassName("carousel_list")[0].childNodes[0].childNodes;
    for(let i=0; i<arr.length; i++){
      children[i].className = arr[i];
    }
    this.switchActive();
  },
  switchActive: function(){
    let arr = this.queue;
    let index = arr.indexOf("current");
    let children = document.getElementsByClassName("switch_list")[0].childNodes[0].childNodes;
    for(let i=0; i<arr.length; i++){
      children[i].className = (i === index) ? "on" : "";
    }    
  }

};