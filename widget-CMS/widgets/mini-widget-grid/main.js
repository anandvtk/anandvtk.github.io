// wrapper start
(function() {


// initialise
$(window).on('widget:init', function() {

	$('section.sectionBar, section.sectionBarHoriz').each(function() {
		var widget = $(this);
		var nums = []; // numerical data
		var numsLargest = -1; // total
		// grab data
		widget.find('dd').each(function(i) {
			var f = parseFloat($(this).text().replace(/[^0-9.-]/g, ''));
			f = Math.max(f, 0);
			nums.push(f);
			if (f > numsLargest) {
				numsLargest = f;
			}
		});
		// style bars
		widget.find('dd').each(function(i) {
			$(this).addClass('background0');
			$(this).html('<span>' + $(this).html() + '</span>');
			var extra = $(this).attr('data-widget-extra-1');
			if (extra == '*') {
				$(this).addClass('backgroundHighlight');
			}
			if ( (extra !== undefined) && (extra.search(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) !== -1) ) {
				$(this).css('background-color', extra);
			}
			var p = 100*nums[i]/numsLargest;
			$(this).css('width', String(p) + '%').css('height', String(p) + '%');
			if (p < 25) {
				$(this).addClass('sectionBarOutside');
			}
		});
	});

	$('section.sectionPie').each(function() {
		var widget = $(this);
		var nums = []; // numerical data
		var numsTotal = 0; // total
		// enough data?
		if (widget.find('dd').length < 1) {
			return;
		}
		// grab data
		widget.find('dd').each(function(i) {
			var f = parseFloat($(this).text().replace(/[^0-9.]/g, ''));
			nums.push(f);
			numsTotal += f;
		});
		var rTotal = 0; // running rotation total
		// sort out markup
		widget.find('dt').each(function(i) {
			var extra = $(this).next().attr('data-widget-extra-1');
			var highlight = false;
			if (extra == '*') {
				highlight = true;
			}
			var customColor = false;
			if ( (extra !== undefined) && (extra.search(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) !== -1) ) {
				customColor = extra;
			}
			// key
			widget.find('figcaption ul').append('<li><strong></strong><span></span></li>');
			var li = widget.find('figcaption li').last();
			li.find('strong').text($(this).next().text()).addClass('background' + String(i));
			li.find('span').text($(this).text());
			if (highlight) {
				li.find('strong').addClass('backgroundHighlight');
			}
			if (customColor !== false) {
				li.find('strong').css('background-color', customColor);
			}
			// pie chart
			widget.find('figure > ul').append('<li><span></span><span></span></li>');
			li = widget.find('figure > ul li').last();
			li.addClass('rotate' + String(rTotal))
			var rTotalCss = 'rotate(' + String(rTotal) + 'deg)';
			li.css('-webkit-transform', rTotalCss).css('-moz-transform', rTotalCss).css('-ms-transform', rTotalCss).css('transform', rTotalCss);
			var r = 360*nums[i]/numsTotal;
			if (i == widget.find('dt').length - 1) {
				r = 360 - rTotal;
			}
			rTotal += r;
			var rCss = 'rotate(' + String(r) + 'deg)';
			li.find('span').addClass('background' + String(i)).eq(0).css('-webkit-transform', rCss).css('-moz-transform', rCss).css('-ms-transform', rCss).css('transform', rCss);
			if (r > 180) {
				li.addClass('big');
			}
			// extra colors
			if (highlight) {
				li.find('span').addClass('backgroundHighlight');
			}
			if (customColor !== false) {
				li.find('span').css('background-color', customColor);
			}
		});
	});

	$('section.sectionTable').each(function() {
		var widget = $(this);
		widget.find('th').addClass('background5');
		if (widget.find('table').height() < widget.height()/2) {
			widget.find('table').addClass('pad');
		}
	});

});
	

// wrapper end
})();