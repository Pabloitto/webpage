(function($){
	$.mask = function(){
		$.blockUI({ css: { 
            border: 'none', 
            padding: '15px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff' 
        } });
	};
	$.unmask = function(){
		$.unblockUI();
	};
	$.getAction = function(page , method){
		return [page , '?action=' ,method].join('');
	};
	$.sendAjaxAction = function(url , data ,onsuccess){
		$.mask();
		$.ajax({
		    type: "POST",
		    url: url,
		    data: data,
		    cache: false,
		    complete:$.unmask,
		    success: onsuccess
		});
	};
}(jQuery));