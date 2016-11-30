var unit = 1;
var zoom = '10000000%';
var img = 'images/8785432136_7e9d77bf10_o.jpg';
var changeFlg = false;

function setImg(){
  var value = document.forms.form.imgUrl.value;
  img = value;
  if(img){
    var target = document.getElementById('originalImg');
    target.setAttribute('src', img);
  }
  else{
    alert('Please insert image URL.');
  }
}
function setSize(){
  var value = document.forms.form.size.value;
  unit = value;
}
function setZoom(){
  var value = document.forms.form.zoom.value;
  zoom = value + '%';
}
function moza(){
  var imgObj = new Image();
  imgObj.src = img;
  var iw = imgObj.width;
  var ih = imgObj.height;
  var box = document.getElementById('imgBox');
  box.innerHTML = '';
  box.style.width = iw + 'px';
  box.style.height = ih + 'px';
  
  var columnNum = 100 / unit;
  var add = '';
  for(var i=0; i<100000; i++){
    var size = Math.floor(iw * unit / 100) + 'px';
    var num = i / columnNum;
    var row = Math.floor(num);
    var remainder = num - row;
    var column = columnNum * remainder;
    var perX = column * unit;
    var perY = row * unit;
    var pxX = iw * column * unit / 100;
    var pxY = ih * row * unit / 100;
    if(ih < pxY){
      break;
    }
    add += '<div class="moza" style="top: '+pxY+'px;left: '+pxX+'px;background-position: '+perX+'% '+perY+'%;width: '+size+';padding-bottom: '+size+';background-size: '+zoom+';background-image:url('+img+');"></div>';
  }
  box.innerHTML = add;
}

window.onload = function(){
  moza();
  setImg();
  setSize();
  setZoom();
  var imgInput = document.getElementById('imgUrl');
  var sizeInput = document.getElementById('size');
  var zoomInput = document.getElementById('zoom');
  var submitInput = document.getElementById('submit');
  var changeInput = document.getElementById('changeImg');
  
  imgInput.onchange = function(){
    setImg();
  }
  sizeInput.onchange = function(){
    setSize();
  }
  zoomInput.onchange = function(){
    setZoom();
  }
  submitInput.onclick = function(){
    moza();
  }
  changeInput.onclick = function(){
    var mozaBox = document.getElementById('imgBox');
    var originalBox = document.getElementById('originalImgBox');
    if(changeFlg){
      mozaBox.style.zIndex = '20';
      originalBox.style.zIndex = '10';
      changeFlg = false;
    }
    else{
      mozaBox.style.zIndex = '10';
      originalBox.style.zIndex = '20';
      changeFlg = true;
    }
  }
}