$(function(){

/***************
   VARIABLES
***************/	
	var inView = [];
	var inViewLength = inView.length;
	var inViewEntry = logEntries[inView];
	var audio = new Audio('audio/notification.mp3');
	var beginUTC = moment.utc(moment.utc().format('YYYY-MM-DD HH:mm:ss')).toDate();
	beginLocal = moment(beginUTC).format('HH:mm:ss');
/***************
    FUNCTIONS
***************/
	//click toggle
	jQuery.fn.clickToggle = function(a,b) {
		var ab=[b,a];
		function cb(){ ab[this._tog^=1].call(this); }
		return this.on("click", cb);
	};
	
	//shuffle array
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;
	  // While there remain elements to shuffle...
	  	while (0 !== currentIndex) {
			    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;
		
		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
	return array;
	};
	
		var pdfString = "";
	function makePDF(inViewLength) {
		for(var i = 0, l = inViewLength; i < l; i++) {
			pdfString += logEntries.inView[i] + "<br/>";
			console.log(pdfString);
		}
		return pdfString; 
	};	
	
	//This interates every second...
	setInterval(function(){
			var resultString = "";
		function makeLog(foundValueLength, foundTimeString) {
			for(var i = 0, l = foundValueLength; i < l; i++) {
				resultString += foundTimeString[i] + "<br/>";
						console.log(resultString);
						console.log(i+" "+foundValueLength);
			}
			return resultString; 
		};
		
			//setting inital variables for time manipulation
			var divLocal = $('#zonedTime');
			var localTime = moment.utc(moment.utc().format('YYYY-MM-DD HH:mm:ss')).toDate();
			localTime = moment(localTime).format('HH:mm:ss');
			var minutesFromZero = moment().diff(moment().hour(0).minute(0).second(0), 'minutes');
			var secondsFromZero = moment().diff(moment().hour(0).minute(0).second(0), 'seconds');
			
			var secondsForClock = (localTime.substring(6))/1.68;
			//converting time to variables for log entries and style changes
			var pathPercentage = secondsFromZero / 21.6; 
			var found = timeLogs.indexOf(minutesFromZero);
			var posx = (Math.random() * ($(window).width())).toFixed();
			var posy = (Math.random() * ($(window).height())).toFixed();
			//console.log(posx+' '+posy);			
			//randomizing position of div created for keylog (need to set boundaries 			for the based on width so that the div doesn't go off screen
			//checking if current minute value is in timeLogs array
			if(found != -1){
				//console.log('value is in timeLogs Array');
				var foundIndex = found;
				var foundValue = timeLogs[found];
				var foundTimeString = logEntries[foundValue];
				var hours = Math.floor(foundValue / 60);          
				var minutes = (foundValue) % 60;
				var foundValueTime = 'Logged at '+hours+':'+minutes;
				var foundValueLength = foundTimeString.length;
				var boxHeight = $('.keyLog').height();
				var maxBoxHeight = ($(window).height()) - 100;
				//console.log(boxHeight);	
				/*var makeLogAgain = $.each(foundTimeString, function(index, foundTimeString) {  
		return foundTimeString;
	});*/
				if($("#" + foundValue).length == 0) {
					inView.push(foundValue);
					//console.log('this is box height '+maxBoxHeight);
					if (boxHeight > maxBoxHeight ) {
						$('<div/>', {id: foundValue+'b',class: 'keyLog',})
							.appendTo('main')
							//animate and randomize position
							.animate({left: posx, top: posy})
						//enter the string associated with the typed function
						$("#" + foundValue).typed({
						    strings: [makeLog(foundValueLength, foundTimeString)],
						    typeSpeed: 20
						});
					} else {
					//create a div for the keylog entry attached to this time
						$('<div/>', {id: foundValue,class: 'keyLog',})
							.appendTo('main')
							//animate and randomize position
							.animate({left: posx, top: posy})
						//enter the string associated with the typed function
						$("#" + foundValue).typed({
						    strings: [makeLog(foundValueLength, foundTimeString)],
						    typeSpeed: 20
						});
						currentLog = $("#" + foundValue).html();
						(currentLog);
						if ($('#menuAudio').hasClass('on')){
							audio.play();
						} else {
							audio.pause();
						}
					}
				};
							     
			} else {
			    console.log('value is not in timeLogs Array');
			}		
			
			//setting text into the timebox
			divLocal.text(localTime);
			//entering content into debugging status box
			//make the keylog boxes draggable
			$('.keyLog').draggable({containment: 'window'});
			//setting the length of the path based on the current time
			$('none').css('stroke-dashoffset', pathPercentage);
			//setting the inner circle for the clock
			$('#seconds').attr({
				r : secondsForClock,
			});
			$('#status').html(minutesFromZero);
			/*console.log(inView);*/
	//closing the setInterval fucntion with a timeout of 1000ms or 1s
	},1000);
			
	
	$('#menuAbout').hover(
		function() {
			$('main').css({'display':'none'});
			
		}, function() {
			$('main').css({'display':'block'});
		}
	);
	
	/*$('#menuDownload').click(function() {  
		var tags = ['bounce', 'grow', 'squeeze', 'still', 'stretch'];
		var shuffleTags = shuffle(tags);
		var preSliceShuffle = shuffleTags.slice(0,1);
		var others = (shuffleTags.slice(1,5)).join(" ");
		var sliceShuffle = preSliceShuffle.toString();
		$('#fullView').addClass(sliceShuffle);
		$('#fullView').removeClass(others)
		console.log(sliceShuffle);
		
	});*/
	
	
	$("#menuDownload").clickToggle(function() {   
		$('#fullView').addClass('reformatting');
		setInterval(function(){
			function getRandomArbitrary(min, max) {
				return Math.random() * (max - min) + min;
			};
			
			var scaleRandom = getRandomArbitrary(1.0, 10.0);
			$('.reformatting').css({
			'-webkit-transform':'scale('+scaleRandom+')',
			'-moz-transform':'scale('+scaleRandom+')',
			'-ms-transform-':'scale('+scaleRandom+')',
			'transform':'scale('+scaleRandom+')',
				
			});
					
		},50);
	}, function() {
		$('#fullView').removeClass('reformatting');
	});
	 
	$("#menuAudio").clickToggle(function() {   
		$(this).removeClass('on').addClass('off')
		}, function() {
		$(this).addClass('on').removeClass('off')
	});
	
});	
    
   /*$('body').mousemove(function(e){
	   var parentOffset = $(this).parent().offset();
	   var relX = e.pageX - parentOffset.left;
	   var relY = e.pageY - parentOffset.top;
	   var height = $(window).height();
	   var width = $(window).width();
	   percentY = Math.round((relY / height) * 100);
	   percentX = Math.round((relX / width) * 100);
	   percentForGradient = Math.round((relX / width) * 100)-50;
	   
	   $('body').css({
		   'background':'radial-gradient(ellipse at '+percentX+'% '+percentY+'%, #c4c4c4 0%,#cdcdcd 40%,#cccccc 65%,#bfbfbf 100%)'
	   });
	   $('#fullView').css({
		   'font-size':percentX+'px'
	   })
	});*/
	

    
	window.ondevicemotion = function(event) {  
	    var accelerationX = event.accelerationIncludingGravity.x;  
	    var accelerationY = event.accelerationIncludingGravity.y;  
	    var accelerationZ = event.accelerationIncludingGravity.z; 
	    var moveX = Math.round((accelerationX *100)/10)+57;
	    var moveY = Math.round((accelerationY *100)/10)+50;
	    /*	    
	    $('body').css({
		   'background':'radial-gradient(ellipse at '+percentX+'% '+percentY+'%, #a4a4a4 0%,#cdcdcd 20%,#d2d2d2 40%,#d7d7d7 60%, #dcdcdc 80%,#e9e9e9 100%)'});
		   */
	} 

/***************
    TRASHED
***************/
$(function(){
	var timeToColor = $('#zonedTime').text().replace(/:/g,',');
	
	//tracking mousemovement and change styles based on position
	    

});