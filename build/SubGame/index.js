require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "";
wxDownloader.SUBCONTEXT_ROOT = "SubGame";
require('src/settings.1cb8b');
require('main.7eaf5');
require('libs/sub-context-adapter');