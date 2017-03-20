var bgPage = chrome.extension.getBackgroundPage();
jQuery(document).ready(function () {
	jQuery('.image_cropped').attr({'src': bgPage.simple_screenshot.image_crop});
	jQuery('.save_button').text(chrome.i18n.getMessage("Save"));
	jQuery('.upload_to_server_button').text(chrome.i18n.getMessage("UploadtoServer"));
	jQuery('.save_button').attr({'href': bgPage.simple_screenshot.image_crop});
	jQuery('.upload_to_server_button').click(function () {
		jQuery('.upload_to_server_button').addClass('load');
		var fd = new FormData();
		fd.append('upload_file', bgPage.simple_screenshot.image_blop);
		fd.append('action', 'upload_screen');
		jQuery.ajax({
			type: 'POST',
			url: bgPage.simple_screenshot.upload_url,
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

