var bgPage = chrome.extension.getBackgroundPage();
jQuery(document).ready(function () {
	jQuery('.image_cropped').attr({'src': bgPage.simpleScreenshot.imageCrop});
	jQuery('.save_button').attr({
		'href': bgPage.simpleScreenshot.linkBlobFile,
		'download': bgPage.simpleScreenshot.localName
	});
	document.title = bgPage.simpleScreenshot.localName;

	jQuery('.upload_to_server_button').click(function () {
		jQuery('.upload_to_server_button').addClass('load');
		var fd = new FormData();
		fd.append('action', 'upload_screen');
		fd.append('upload_file', bgPage.simpleScreenshot.imageBlop);
		jQuery.ajax({
			type: 'POST',
			url: bgPage.simpleScreenshot.uploadUrl,
			data: fd,
			processData: false,
			contentType: false
		}).success(function (response) {
			var response = jQuery.parseJSON(response);
			jQuery('.upload_to_server_button').removeClass('load');
			if (response.success == 1) {
				window.location.href = response.redirect_url;
			}
		});
		return false;
	});
});