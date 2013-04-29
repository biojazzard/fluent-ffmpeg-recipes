$(function(){
	var $target = $('#drop-zone');

	function dropZone($target, onDrop){
		$target.
			bind('dragover', function(){
				$target.addClass( 'drag-over' );
				return false;
			}).
			bind("dragend", function () {
				$target.removeClass( 'drag-over' );
				return false;
			}).
			bind("mouseout", function () {
				$target.removeClass( 'drag-over' );
				return false;
			}).
			bind("drop", function(event) {
				var file = event.originalEvent.dataTransfer.files[0];

				event.stopPropagation();
				event.preventDefault();

				$target.removeClass( 'drag-over' );

				var droppedImage = new Image();
				var fileReader = new FileReader();

				fileReader.onload = function (event) {
					droppedImage.src = event.target.result;
					$target.html(droppedImage);
				};

				fileReader.readAsDataURL(file);

				onDrop(file);
			});
	}

	dropZone($target, function(file){

		resemble(file).onComplete(function(data){
			$('#image-data').show();
			$('#red').css('width',data.red+'%');
			$('#green').css('width',data.green+'%');
			$('#blue').css('width',data.blue+'%');
			$('#brightness').css('width',data.brightness+'%');
		});

	});

	function onComplete(data){
		var time = Date.now();
		var diffImage = new Image();
		diffImage.src = data.getImageDataUrl();

		$('#image-diff').html(diffImage);

		$(diffImage).click(function(){
			window.open(diffImage.src, '_blank');
		});

		$('#buttons').show();

		if(data.misMatchPercentage == 0){
			$('#thesame').show();
			$('#diff-results').hide();
		} else {
			$('#mismatch').text(data.misMatchPercentage);
			if(!data.isSameDimensions){
				$('#differentdimensions').show();
			} else {
				$('#differentdimensions').hide();
			}
			$('#diff-results').show();
			$('#thesame').hide();
		}
	}

	var buttons = $('#raw, #colors, #antialising');

	buttons.click(function(){
		var $this = $(this);

		buttons.removeClass('active');
		$this.addClass('active');

		if($this.is('#raw')){
			resembleControl.ignoreNothing();
		}
		else
		if($this.is('#colors')){
			resembleControl.ignoreColors();
		}
		else
		if($this.is('#antialising')){
			resembleControl.ignoreAntialiasing();
		}
	});

});