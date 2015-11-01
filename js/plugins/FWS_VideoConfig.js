//=============================================================================
// Extention to Yanfly core plugin
// FWS_VideoConfig.js
// Version: 0.1.0
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CoreEngine = true;

var Yanfly = Yanfly || {};
Yanfly.VideoConfig = Yanfly.VideoConfig || {};

var FWS = FWS || {};
/*:
 * @plugindesc Change screen setting in options menu.
 * @author FullWild Studio
 *
 * @param screenWidth
 * @desc Default width of the game.
 * @default 816
 *
 * @param screenHeight
 * @desc Default height of the game.
 * @default 624
 *
 * @param fullscreen
 * @desc Default fullscreen value.
 * @default false
 *
 * @help This plugin does not provide plugin commands.
 */

 var lang = "fr";

 	FWS.videoSettingsName = "Paramètres vidéo";
 	FWS.videoSettingsDefault = "Valeur par défaut";
 	FWS.videoSettingsSave = "Sauvegarder les changements";
 	FWS.videoSettingsQuit = "Retour au menu précédent";
 	FWS.videoSettingsTitle = "Vous pouvez changer vos paramètres vidéo";
 	FWS.videoSettingsResolution = "Résolution  : ";
 	FWS.videoSettingsFullscreen = "Plein écran : ";
 	FWS.videoSettingsYes = "Oui";
 	FWS.videoSettingsNo = "Non";
 	FWS.commonScreenResolution = [
 		{
 			width : 816,
 			height : 624
 		},{
 			width : 1920,
 			height : 1080
 		},{
 			width : 1366,
 			height : 768
 		},{
 			width : 1600,
 			height : 900
 		},{
 			width : 1280,
 			height : 1024
 		},{
 			width : 1440,
 			height : 900
 		},{
 			width : 1680,
 			height : 1050
 		},{
 			width : 1280,
 			height : 800
 		},{
 			width : 1600,
 			height : 1200
 		},{
 			width : 1280,
 			height : 960
 		},{
 			width : 1024,
 			height : 768
 		}];

	FWS.defaultScreen = {
		width: Number(Yanfly.Parameters["screenWidth"] 	|| 816),
		height: Number(Yanfly.Parameters["screenHeight"] 	|| 624),
		fullscreen: Yanfly.Parameters["fullscreen"] || "false"
	}

 	ConfigManager.videoSettings = FWS.defaultScreen;

 	//
 	// ConfigManager
 	//
 	Yanfly.VideoConfig.ConfigManager_makeData = ConfigManager.makeData;
 	ConfigManager.makeData = function(){
 		var config = Yanfly.VideoConfig.ConfigManager_makeData.call(this);
 		config.videoSettings = this.videoSettings;
 		return config;
 	};

 	Yanfly.VideoConfig.ConfigManager_applyData = ConfigManager.applyData;
 	ConfigManager.applyData = function(config){
 		Yanfly.VideoConfig.ConfigManager_applyData.call(this, config);
 		this.videoSettings = this.readVideoSettings(config, "videoSettings");
 	};

 	ConfigManager.readVideoSettings = function(config, name){
 		var values = config[name];
 		if(values !== undefined){
 			ConfigManager.videoSettings = values;
 			return values;
 		}
 		return FWS.defaultScreen;
 	};

 	ConfigManager.applyVideoSettings = function(){
 		var changedToFullscreen = Graphics._ChangeFullscreen(ConfigManager.videoSettings.fullscreen);
 		console.log("Apply video settings", ConfigManager.videoSettings, changedToFullscreen);
 		if(changedToFullscreen){
 			/*
 			Graphics.boxWidth = window.screen.width;
 			Graphics.boxHeight = window.screen.height;
 			//*/
 			SceneManager._screenWidth  = window.screen.width;
			SceneManager._screenHeight = window.screen.height;
			SceneManager._boxWidth     = window.screen.width;
			SceneManager._boxHeight 	= window.screen.height;
 		}else{
 			/*
 			Graphics.boxWidth = ConfigManager.videoSettings.width;
 			Graphics.boxHeight = ConfigManager.videoSettings.height;
 			//*/

	 		SceneManager._screenWidth  = Number(ConfigManager.videoSettings.width);
			SceneManager._screenHeight = Number(ConfigManager.videoSettings.height);
			SceneManager._boxWidth     = Number(ConfigManager.videoSettings.width);
			SceneManager._boxHeight 	= Number(ConfigManager.videoSettings.height);
 		}
 	};

 	Graphics._ChangeFullscreen = function(fullscreen){
 		console.log("fullscreen", fullscreen);
 		if (fullscreen == true) {
	      this._requestFullScreen();
	      return true;
	   } else {
	      this._cancelFullScreen();
	      return false;
	   }
 	}


	//
 	//Init to the value store
 	//
  	Yanfly.VideoConfig.SceneManager_run = SceneManager.run;
 	SceneManager.run = function(sceneClass){
 		ConfigManager.load();
 		ConfigManager.applyVideoSettings();
 		Yanfly.VideoConfig.SceneManager_run.call(this, sceneClass);
 	};

 	//
 	// Window_Options
 	//
 	Yanfly.VideoConfig.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
 	Window_Options.prototype.addGeneralOptions = function(){
 		Yanfly.VideoConfig.Window_Options_addGeneralOptions.call(this);
 		this.addVideoConfigCommand();
 	};
 	Window_Options.prototype.addVideoConfigCommand = function(){
 		this.addCommand(FWS.videoSettingsName, 'videoSettings', true);
 	};

 	Yanfly.VideoConfig.Window_Options_drawItem = Window_Options.prototype.drawItem;
 	Window_Options.prototype.drawItem = function(index){
 		if(this.commandSymbol(index) === "videoSettings"){
 			var rect = this.itemRectForText(index);
			var text = this.commandName(index);
			this.resetTextColor();
			this.changePaintOpacity(this.isCommandEnabled(index));
			this.drawText(text, rect.x, rect.y, rect.width, 'left');
 		}else{
 			Yanfly.VideoConfig.Window_Options_drawItem.call(this, index);
 		}
 	};

 	Yanfly.VideoConfig.Window_Options_processOk = Window_Options.prototype.processOk;
	Window_Options.prototype.processOk = function() {
	  if (this.commandSymbol(this.index()) === 'videoSettings') {
			Window_Command.prototype.processOk.call(this);
		} else {
			Yanfly.VideoConfig.Window_Options_processOk.call(this);
		}
	};

 	//
 	// Window_VideoSettings
 	//
 	function Window_VideoSettings(){
 		this.initialize.apply(this,arguments);
 	};

 	Window_VideoSettings.prototype = Object.create(Window_Command.prototype);
 	Window_VideoSettings.prototype.constructor = Window_VideoSettings;

	Window_VideoSettings.prototype.initialize = function(helpWindow) {
		var wy = helpWindow.height;
		Window_Command.prototype.initialize.call(this, 0, wy);
	  	this.setHelpWindow(helpWindow);
		this.height = Graphics.boxHeight - wy;
		this.refresh();
		this.activate();
		this.select(0);
	};

	Window_VideoSettings.prototype.windowWidth = function() {
   	return Graphics.boxWidth;
	};

	Window_VideoSettings.prototype.itemTextAlign = function() {
	   return 'center';
	};

	Window_VideoSettings.prototype.drawItem = function(index) {
		var rect = this.itemRectForText(index);
		var statusWidth = 120;
		var titleWidth = rect.width - statusWidth;

		this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
		if(this.isCommand(index)){
			this.drawText(this.valueText(index), titleWidth, rect.y, statusWidth, 'right');
		}
	};

	Window_VideoSettings.prototype.valueText = function(index){
		var symbol = this.commandSymbol(index);
		var value = this.getVideoSettingsValue(symbol);

		if(!this.isResolution(symbol)){
			return value == true ? FWS.videoSettingsYes : FWS.videoSettingsNo;
		}
		return value;
	};

	Window_VideoSettings.prototype.getVideoSettingsValue = function(symbol){
 		switch(symbol){
 	 		case "resolution":
 	 			return ConfigManager.videoSettings.width+"x"+ConfigManager.videoSettings.height;
 	 			break;
 	 		case "fullscreen":
 	 			return ConfigManager.videoSettings.fullscreen;
 	 			break;
 	 		default:
 	 			return false;
 	 	}
 	};

 	Window_VideoSettings.prototype.setVideoSettingsValue = function(symbol,value){
 		switch(symbol){
 	 		case "resolution":
 	 			var result = value.split("x");
 	 			ConfigManager.videoSettings.width = result[0];
 	 			ConfigManager.videoSettings.height = result[1];
 	 			break;
 	 		case "fullscreen":
 	 			ConfigManager.videoSettings.fullscreen = value;
 	 			break;
 	 	}
 	};

	Window_VideoSettings.prototype.isCommand = function(index){
		var symbol = this.commandSymbol(index);
		switch(symbol){
 	 		case "resolution":
 	 			return true;
 	 			break;
 	 		case "fullscreen":
 	 			return true;
 	 			break;
 	 		default:
 	 			return false;
 	 	}
	}

	Window_VideoSettings.prototype.isResolution = function(symbol){
		return symbol.contains("resolution");
	}

	Window_VideoSettings.prototype.makeCommandList = function(index) {
		this.addCommand(FWS.videoSettingsResolution, 'resolution', true);
		this.addCommand(FWS.videoSettingsFullscreen, 'fullscreen', true);

		this.addCommand(FWS.videoSettingsDefault, 'default');
		this.addCommand(FWS.videoSettingsSave, 'save');
		this.addCommand(FWS.videoSettingsQuit, 'quit');
	};

	Window_VideoSettings.prototype.changeValue = function(symbol, value) {
	   	var lastValue = this.getVideoSettingsValue(symbol);
	   	if (lastValue !== value) {
	   		this.setVideoSettingsValue(symbol,value);
	   		this.redrawItem(this.findSymbol(symbol));
	   		SoundManager.playCursor();
	   	}
	};

	Window_VideoSettings.prototype.indexOfResolution = function(width, height){
		var indexToReturn = 0;
		FWS.commonScreenResolution.forEach(function(element, index){
			if(element.width == width && element.height == height){
				indexToReturn = index;
			}
		});
		return indexToReturn;
	}

	Window_VideoSettings.prototype.cursorRight = function(wrap) {
	    var index = this.index();
	    var symbol = this.commandSymbol(index);
	    var value = this.getVideoSettingsValue(symbol);
	    if (this.isResolution(symbol)) {
	    	this.cursorForRes(symbol, value, 1);
	    } else {
	      this.changeValue(symbol, true);
	    }
	};

	Window_VideoSettings.prototype.cursorLeft = function(wrap) {
	    var index = this.index();
	    var symbol = this.commandSymbol(index);
	    var value = this.getVideoSettingsValue(symbol);
	    if (this.isResolution(symbol)) {
	    	this.cursorForRes(symbol, value, -1);
	    } else {
	      this.changeValue(symbol, false);
	    }
	};

	Window_VideoSettings.prototype.cursorForRes = function(symbol, value, order){
		var screenSize = value.split("x");
	   commonTabCurrent = this.indexOfResolution(screenSize[0], screenSize[1]);
	   //var nextTab = commonTabCurrent -1;
	   var nextTab = (commonTabCurrent +(order)*1);
	   if(order >0 ){
	   	nextTab = nextTab >= FWS.commonScreenResolution.length ? commonTabCurrent : nextTab;
	   }else{
	   	nextTab = nextTab < 0 ? commonTabCurrent : nextTab;
	   }
	   var stringValue = FWS.commonScreenResolution[nextTab].width + "x" +FWS.commonScreenResolution[nextTab].height;

	   this.changeValue(symbol, stringValue);
	}

	Window_VideoSettings.prototype.updateHelp = function(){
		if(!this._helpWindow) return ;
		this._helpWindow.setText(FWS.videoSettingsTitle);
	};

	//
 	// Window_ResolutionChoice
 	//

 	function Window_ResolutionChoice(){
 		this.initialize.apply(this, arguments);
 	};
 	Window_ResolutionChoice.prototype = Object.create(Window_Command.prototype);
 	Window_ResolutionChoice.prototype.constructor = Window_ResolutionChoice;

 	Window_ResolutionChoice.prototype.initialize = function(){
 		Window_Command.prototype.initialize.call(this,0,0);
 		this.x = (Graphics.boxWidth - this.width) /2;
 		this.y = (Graphics.boxHeight - this.height) /2;
 		this.openness = 0;
 		this.deactivate();
 	};

 	Window_ResolutionChoice.prototype.makeCommandList = function(){
 		var resString = "";
 		for(screenRes of FWS.commonScreenResolution){
 			resString = screenRes.width+"x"+screenRes.height;
 			this.addCommand(resString, "ok", true, "resString");
 		}

 	}

 	//
 	// Scene_Options
 	//
 	Yanfly.VideoConfig.Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
 	Scene_Options.prototype.createOptionsWindow = function() {
		Yanfly.VideoConfig.Scene_Options_createOptionsWindow.call(this);
		this._optionsWindow.setHandler('videoSettings', this.commandVideoSettings.bind(this));
	};

	Scene_Options.prototype.commandVideoSettings = function() {
		SceneManager.push(Scene_VideoSettings);
	};

	//
 	// Scene_VideoSettings
 	//
 	function Scene_VideoSettings(){
 		this.initialize.apply(this, arguments);
 	};

 	Scene_VideoSettings.prototype = Object.create(Scene_MenuBase.prototype);
 	Scene_VideoSettings.prototype.constructor = Scene_VideoSettings;

 	Scene_VideoSettings.prototype.initialize = function(){
 		Scene_MenuBase.prototype.initialize.call(this);
 	};

 	Scene_VideoSettings.prototype.create = function(){
 		Scene_MenuBase.prototype.create.call(this);
 		this.createHelpWindow();
 		this.createVideoSettingsWindow();
 	};

 	Scene_VideoSettings.prototype.terminate = function(){
 		Scene_MenuBase.prototype.terminate.call(this);
 		ConfigManager.save();
 	};

 	Scene_VideoSettings.prototype.refreshWindows = function(){
 		this._configWindow.refresh();
 		this._configWindow.activate();
 		ConfigManager.save();
 	};

 	Scene_VideoSettings.prototype.createVideoSettingsWindow = function(){
 		this._configWindow = new Window_VideoSettings(this._helpWindow);
 		this._configWindow.setHandler("default", this.commandDefault.bind(this));
 		this._configWindow.setHandler("save",  this.commandSave.bind(this));
 		this._configWindow.setHandler("quit",  this.popScene.bind(this));
 		this.addWindow(this._configWindow);
 	};

 	Scene_VideoSettings.prototype.commandSave = function(){
 		ConfigManager.applyVideoSettings();
 		ConfigManager.save();
 		console.log("Save", ConfigManager.videoSettings);
 		this.refreshWindows();
 	}

 	Scene_VideoSettings.prototype.commandDefault = function(){
 		ConfigManager.videoSettings = FWS.defaultScreen;
 		ConfigManager.applyVideoSettings();
		this.refreshWindows();
 	}