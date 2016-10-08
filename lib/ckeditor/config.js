/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};



CKEDITOR.editorConfig = function(config) {
	   config.filebrowserBrowseUrl = 'lib/uploader/browser.php';
	   config.filebrowserFileBrowseUrl = 'lib/uploader/browser.php?dir=files/';
	   config.filebrowserImageBrowseUrl = 'lib/uploader/browser.php?dir=images/';
	   config.filebrowserVideoBrowseUrl = 'lib/uploader/browser.php?dir=videos/'
	   config.filebrowserFlashBrowseUrl = 'lib/uploader/browser.php?dir=flash/';
	   config.filebrowserUploadUrl = 'lib/uploader/upload.php';
	   config.extraPlugins = 'video';
	   CKEDITOR.config.allowedContent = true;
	   config.disableNativeSpellChecker = false;
	   //config.filebrowserImageUploadUrl = 'kcfinder/upload.php?type=images';
	   //config.filebrowserFlashUploadUrl = 'kcfinder/upload.php?type=flash';
	   /*
	   config.toolbar_Full = [
			{ name: 'document',    groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', 'Templates', 'document' ] },
			// On the basic preset, clipboard and undo is handled by keyboard.
			// Uncomment the following line to enable them on the toolbar as well.
			// { name: 'clipboard',   groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo' ] },
			{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', 'SelectAll', 'Scayt' ] },
			{ name: 'insert', items: [ 'CreatePlaceholder', 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe', 'InsertPre' ] },
			{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
			'/',
			{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat' ] },
			{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ], items: [ 'NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl' ] },
			{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
			'/',
			{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
			{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
			{ name: 'tools', items: [ 'UIColor', 'Maximize', 'ShowBlocks' ] },
			{ name: 'about', items: [ 'About' ] }
		  ];
		*/
		config.toolbar_Full = [
			{ name: 'document',    groups: [ 'mode', 'document', 'doctools' ]},

			{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo' ] },

			// On the basic preset, clipboard and undo is handled by keyboard.
			// Uncomment the following line to enable them on the toolbar as well.
			{ name: 'insert', items: [ 'CreatePlaceholder', 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar'] },

			{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },

			{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ], items: [ 'NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl' ] },

			{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', 'RemoveFormat' ] },
			
			{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
			{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },

			{ name: 'tools', items: [ 'UIColor', 'Maximize', 'PageBreak'] },
		  ];
  config.toolbar = "Full";
	};


	(function() {
		var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
		if (isChrome) {
			CKEDITOR.on( 'instanceLoaded', function( e ){
				this.addCss('.cke_editable { line-height: normal; }');
			});
		}
	})();
