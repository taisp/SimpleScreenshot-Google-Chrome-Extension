/**
 * Created by sergejsavenko on 2/25/17.
 */
function simple_screenshot_overlay_toggle() {
	jQuery('body').append('<div class="simple_screenshot_bg"></div>');
	jQuery('.simple_screenshot_bg').Jcrop({
		onSelect: function (c) {
			chrome.extension.sendMessage({
				screenshotCoords: c,
			});
			jQuery('.simple_screenshot_bg').remove();
		},
	});
}

