// A $( document ).ready() block.
$( document ).ready(function() {
  var personObject = setNewPerson();
  var correctPerson = 0;
  var incorrectPerson = 0;
  var total = cohort.length;
  var remaining = {};
  // _.each(cohort, function(person) {
  //   remaining[person.first.toLowerCase() + person.last.toLowerCase()] = person.first + ' ' + person.last;
  // });
  // for (var x in remaining) {
  //   $('#choices-table tr:last').after('<tr id="' + x + '"><td>' + remaining[x] + '</td></tr>');
  // }
  populateChoiceList();
  $('#guess-button').on('click', function () {
    checkPerson();
  });
  
  $('#dunno-button').on('click', function() {
    wrongGuess();
  });

  $("#guess").on('keyup', function (e) {
    if (e.keyCode == 13) {
      checkPerson();
    }
  });

  var wrongGuess = function() {
    incorrectPerson++;
    $('#bio-container').css('visibility', 'visible');
    $('#name').text(personObject.first + ' ' + personObject.last + (personObject.nickname ? ' (' + personObject.nickname + ')' : ''));

    $('#guess').val('');
  };


  var checkPerson = function () {
    var guessobj = $('#guess');
    var guess = $('#guess').val().toLowerCase();
    var firstName = personObject.first.toLowerCase();
    var lastName = personObject.last.toLowerCase();
    if (guess === firstName || guess === firstName + ' ' + lastName || (personObject.nickname && guess === personObject.nickname.toLowerCase())) {
      //alert('Correct');
      correctPerson++;
      personObject.visited = true;
      var key = firstName + lastName;
      delete remaining[key];
      $('#' + key).remove();
    } else {
      wrongGuess();
      return;
      //alert('Incorrect');
    }

    if (Object.keys(remaining).length === 0) {
      alert('You made: ' + incorrectPerson + ' mistakes.');
      for (var x = 0; x < cohort.length; x++) {
        cohort[x].visited = false;
      }
      populateChoiceList();
    } 
    personObject = setNewPerson();
    guessobj.val('');

  };
  function populateChoiceList(){
    _.each(cohort, function(person) {
      remaining[person.first.toLowerCase() + person.last.toLowerCase()] = person.first + ' ' + person.last;
    });
    for (var x in remaining) {
      $('#choices-table tr:last').after('<tr id="' + x + '"><td>' + remaining[x] + '</td></tr>');
    }
  }
  function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

      var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

      return { width: srcWidth*ratio, height: srcHeight*ratio };
  }
  function setNewPerson () {
   $('#bio-container').css('visibility', 'hidden');
   var personObject = cohort[Math.floor(Math.random() * cohort.length)];
   while(personObject.visited) {
     personObject = cohort[Math.floor(Math.random() * cohort.length)];
   }
   
   //personObject.visited = true;
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