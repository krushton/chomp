
// <div class="tooth" style="height: {{tooth}}px" ng-repeat="tooth in bottomTeeth track by $index"></div>

var getTeeth = (num) => {
  var teeth = '';
  for (var i = 0; i < num; i++){
      teeth += '<div class="tooth" style="height: ' + getRandomHeight() + 'px"></div>';
  }
  return teeth;
}

var getRandomHeight = () => {
  return Math.floor(Math.random() * 5) + 6;
}

var getTemplate = (inputElem) => {
  var width = inputElem.offsetWidth;
  return `<div class="mouth" style="width: ` + (width + 18) + `px">
        <div class="teeth top-teeth">`   + getTeeth(10) + `
        </div>
        <div class="teeth bottom-teeth">` + getTeeth(8) + `
        </div>
      </div>
    </div>`
}

var chomp = (event) => {
   var element = event.target;
   var mouth = element.parentElement;

   if (!element.value) {
    return;
   }
   
    setTimeout(function(){
      mouth.classList.add('closed');
    },500)
    setTimeout(function(){
     mouth.classList.add('open');
     mouth.classList.remove('closed');
    },600)
    setTimeout(function(){
      mouth.classList.add('closed');
     mouth.classList.remove('remove');
    },700)
    setTimeout(function(){
      mouth.classList.remove('closed');
      element.value = '';
    },800);
}

var makeChompers = () => {

    //find the input elements
    var inputs = document.querySelectorAll("input.chomp");

    inputs.forEach((inputElement)=> {
          
          var parent = inputElement.parentElement;
          var wrapper= document.createElement('div');
          wrapper.innerHTML= getTemplate(inputElement);
          var newElem= wrapper.firstChild;
          wrapper.remove();

          inputElement.addEventListener("blur", () => {
            chomp(event)
          });
          newElem.getElementsByClassName('top-teeth')[0].after(inputElement);
          parent.appendChild(newElem);
          
    })

}

window.onload = makeChompers;