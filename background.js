var simpleScreenshot = {
	currentImage: '',
	imageCrop: '',
	imageObg: '',
	imageBlop: '',
	virtualImage: '',
	virtualCanvas: '',
	devicePixelRatio: '',
	uploadUrl: 'http://s1.taisp.net/upload.php',
	screenshotLocalName: '',
	linkBlobFile: '',
	getScreenshot: function () {
		simpleScreenshot.getDevicePixelRatio();
		chrome.tabs.captureVisibleTab(null, {}, function (image) {
			simpleScreenshot.currentImage = image;
		});
	},
	openEditorPage: function () {
		this.preCropImage();
		chrome.tabs.create({'url': chrome.extension.getURL('editor.html')}, function (tab) {
			simpleScreenshot.cropImage();
		});
	},
	preCropImage: function () {
		this.virtualImage = new Image;
		this.virtualCanvas = document.createElement('canvas');
		this.virtualCanvas.width = this.imageObg.w * this.devicePixelRatio;
		this.virtualCanvas.height = this.imageObg.h * this.devicePixelRatio;
		this.virtualImage.src = this.currentImage;
	},
	cropImage: function () {
		var x = 0 - this.imageObg.x;
		var y = 0 - this.imageObg.y;
		this.virtualCanvas.getContext('2d').drawImage(this.virtualImage, x * this.devicePixelRatio, y * this.devicePixelRatio, this.virtualImage.width, this.virtualImage.height)
		this.virtualCanvas.toBlob(function (blob) {
			simpleScreenshot.imageBlop = blob;
			simpleScreenshot.linkBlobFile = window.window.URL.createObjectURL(blob);
		}, {type: 'image/png', encoding: 'utf-8'});
		this.imageCrop = this.virtualCanvas.toDataURL("image/png");
	},
	localizateStrings: function () {
		jQuery('.localed_string').each(function () {
			if (jQuery(this).data('l') != undefined)
				jQuery(this).text(chrome.i18n.getMessag(jQuery(this).data('l')));
		});
	},
	getDevicePixelRatio: function () {
		this.devicePixelRatio = window.devicePixelRatio;
	},
	getScreenshotLocalName: function () {
		var date = new Date();
		return date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '__' + Math.random() + '.png';
	}
}
chrome.browserAction.onClicked.addListener(function (tab) {
	simpleScreenshot.getScreenshot();
	setTimeout(function () {
		chrome.tabs.executeScript(null, {code: "window.simple_screenshot_overlay_toggle();"});
	}, 100);
});
chrome.extension.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.screenshotCoords != undefined) {
			simpleScreenshot.imageObg = request.screenshotCoords;
			simpleScreenshot.localName = simpleScreenshot.getScreenshotLocalName();
			simpleScreenshot.openEditorPage();
		}
	}
);