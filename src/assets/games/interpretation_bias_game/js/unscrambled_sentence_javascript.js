$(document).ready(function(){
	$('#showSentence').hide();
	$('#guessedSentence').hide();
	$('#submitSentence').hide();
    
    $('#play').click(function(){
    	$('#showSentence').show();
		$('#guessedSentence').show();
		$('.game-instructions').hide();
		$('#submitSentence').show();
    });
    $('#submitSentence').click(function(){
		sentence = document.getElementById("guessedSentence").value;
		console.log(sentence);
	});
});

var sentence = " ";


function showSentence(neg_part,pos_part,remaining_part){
	console.log(neg_part + " " + pos_part + " "+ remaining_part);
	var remaining_part_sentence =  remaining_part.split(' ').shuffle().join(' ');
	console.log(remaining_part_sentence);
	document.getElementById('sentence').innerHTML = neg_part + " " + pos_part + " " + remaining_part_sentence;

 }


Array.prototype.shuffle = function() {
    var i = this.length;
    if (i == 0) return this;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1 ));
        var a = this[i];
        var b = this[j];
        this[i] = b;
        this[j] = a;
    }
    return this;
};