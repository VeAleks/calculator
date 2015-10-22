// page init
jQuery(function() {
	initCalculator ();
});

function initCalculator() {
	$('#calculateForm').each(function() {
		var holder = $(this),
			button = holder.find('#btnCalc'),
			elements,
			specRate = holder.find('#spec'),
			spec,
			duration,
			mainDuration,
			summary,
			layout = 0.5,
			numMedia = 0,
			summHours,
			summCount,
			days = holder.find('#day'),
			radios = $('#layout > li').find(':radio'),
			result = holder.find('#result');

		function initLayout(){
			$('#layout > li').each(function() {
				var item = $(this),
					radio = item.find(':radio');

				if(radio.is(':checked')){
					var radioId = radio.attr('id');

					switch(radioId) {
						case 'defResp':
							layout = 0.3 + 0.2;
							break;
						case 'oneResp':
							layout = 0.45 + 0.2;
							break;
						case 'twoResp':
							layout = 0.45 + 0.35;
							break;
						case 'threeResp':
							layout = 0.45 + 0.35 + 0.15;
							break;
						case 'fourResp':
							layout = 0.45 + 0.35 + 0.15 + 0.15;
							break;
						case 'desktopOnly':
							layout = 0;
							break;
					}
				}
			});
		}

		function findFequirement () {
			summHours = 0;
			summCount = 0;
			$('.add-requirement > li').each(function() {
				var item = $(this),
					checkbox = item.find(':checkbox'),
					hours = checkbox.attr('data-hours'),
					count = checkbox.attr('data-count');

				if (hours && checkbox.is(':checked')){
					summHours = summHours + parseFloat(hours);
				}
				if (count && checkbox.is(':checked')){
					summCount = summCount + parseFloat(count);
				}
			});
		}

		function summaryFun() {
			elements = holder.find('#qtyElement').val(),
			duration = parseFloat(elements / 5);
			mainDuration = duration + duration * layout;
			spec = mainDuration * 0.1;
			findFequirement();
			console.log('summCount', summCount);
			console.log('mainDuration', mainDuration);

			summary = mainDuration + spec + summHours + mainDuration * summCount;
			//specRate.text(spec);
			result.text(Math.round(summary * 10) / 10);
			days.text(Math.ceil(summary / 7 * 10) / 10);
		}

		radios.on('click', initLayout);
		button.on('click', function() {
			summaryFun();
		});
	});
}
