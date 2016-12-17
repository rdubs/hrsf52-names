// A $( document ).ready() block.

$( document ).ready(function() {
  var personObject = setNewPerson();
  var correctPerson = 0;
  var incorrectPerson = 0;
  var total = cohort.length;
  
  $('#guess-button').on('click', checkPerson);
  
  $("#guess").on('keyup', function (e) {
    if (e.keyCode == 13) {
      checkPerson();
    }
  });

  var checkPerson = function () {
    var guessobj = $('#guess');
    var guess = $('#guess').val().toLowerCase();
    var firstName = personObject.first.toLowerCase();
    if (guess === firstName || guess === firstName + ' ' + personObject.last.toLowerCase() || guess === personObject.nickname.toLowerCase()) {
      //alert('Correct');
      correctPerson++;
    } else {
      incorrectPerson++;
      //alert('Incorrect');
    }

    if (correctPerson+incorrectPerson === total) {
      alert('You got :' + correctPerson + '/' + total);
      for (var x = 0; x < cohort.length; x++) {
        cohort[x].visited = false;
      }
    } 
    personObject = setNewPerson();
    guessobj.val('');

  }
  
  function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

      var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

      return { width: srcWidth*ratio, height: srcHeight*ratio };
  }
  function setNewPerson () {
  
   var personObject = cohort[Math.floor(Math.random() * cohort.length)];
   while(personObject.visited) {
     personObject = cohort[Math.floor(Math.random() * cohort.length)];
   }
   
   personObject.visited = true;
   var img = $('#person');
   img.width('100%');
   img.height('100%');
   img.attr('src', personObject.img);
  
   img.load(function () {
     var dimensions = calculateAspectRatioFit(this.width, this.height, 640, 480);
     var img2 = $('#person');
     img2.width(dimensions.width);
     img2.height(dimensions.height);
   });
    return personObject;
  }
});