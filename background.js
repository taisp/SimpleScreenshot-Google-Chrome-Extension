chrome.browserAction.onClicked.addListener(function (tab) {
	simple_screenshot.get_screenshot();
	chrome.tabs.executeScript(null, {code: "window.simple_screenshot_overlay_toggle();"});
});


chrome.extension.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.screenshotCoords != undefined) {
			simple_screenshot.image_obg = request.screenshotCoords;
			setTimeout(simple_screenshot.open_editor_page(), 400);
		}

	});

var simple_screenshot = {
	current_image: '',
	image_crop: '',
	image_obg: '',
	image_blop: '',

	/*Your link on server*/
	upload_url: 'http://s1.taisp.net/upload.php',

	get_screenshot: function () {
		chrome.tabs.captureVisibleTab(null, {}, function (image) {
			simple_screenshot.current_image = image;
		});
	},

	open_editor_page: function () {
		this.crop_image();
		chrome.tabs.create({'url': chrome.extension.getURL('editor.html')}, function (tab) {
		});
	},
	
	crop_image: function () {
		var image = new Image();
		image.src = this.current_image;
		var resize_canvas = document.createElement('canvas');
		resize_canvas.width = this.image_obg.w;
		resize_canvas.height = this.image_obg.h;
		var x = 0 - this.image_obg.x;
		var y = 0 - this.image_obg.y;
		resize_canvas.getContext('2d').drawImage(image, x, y, image.width / window.devicePixelRatio, image.height / window.devicePixelRatio)
		resize_canvas.toBlob(function (blob) {
			simple_screenshot.image_blop = blob;
		}, {type: 'image/png', encoding: 'utf-8'});
		this.image_crop = resize_canvas.toDataURL("image/png");
	}
}
