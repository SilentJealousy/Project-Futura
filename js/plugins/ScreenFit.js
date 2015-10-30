//=============================================================================
// ScreenFit.js
// Version: 1.3
//=============================================================================
 /*:
 * @plugindesc v 1.3 Fit width and height to the resolution of your screen. Select what folder of battleback have to use. Can force full screen
 * @author Bodkaa
 
 *@param Fullscreen
 *@desc 1 = force fullscreen 0 = no force
 *@default 1
*/

var parameters = PluginManager.parameters('ScreenFit');
var FullScreen = Number(parameters['Fullscreen']);
var lineHeight = Window_Base.prototype.lineHeight();

SceneManager._screenWidth  = screen.width;
SceneManager._screenHeight = screen.height;
SceneManager._boxWidth     = screen.width;
SceneManager._boxHeight    = screen.height;

SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
   SceneManager_run.call(this, sceneClass);
	if (FullScreen == 1){Graphics._switchFullScreen()};
};

Scene_Battle.prototype.createActorWindow = function() {
    this._actorWindow = new Window_BattleActor(0, this._statusWindow.y);
    this._actorWindow.setHandler('ok',     this.onActorOk.bind(this));
    this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
    this.addWindow(this._actorWindow);
};

Scene_Battle.prototype.createEnemyWindow = function() {
    this._enemyWindow = new Window_BattleEnemy(0, this._statusWindow.y);
    this._enemyWindow.x = Graphics.boxWidth - this._enemyWindow.width;
    this._enemyWindow.setHandler('ok',     this.onEnemyOk.bind(this));
    this._enemyWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
    this.addWindow(this._enemyWindow);
};

//********************** Change resolution path **********************//

ImageManager.loadBattleback1 = function(filename, hue) {
    return this.loadBitmap('img/'+ Graphics.boxWidth + "x" + Graphics.boxHeight + '/battlebacks1/', filename, hue, true);
}

ImageManager.loadBattleback2 = function(filename, hue) {
    return this.loadBitmap('img/'+ Graphics.boxWidth + "x" + Graphics.boxHeight + '/battlebacks2/', filename, hue, true);
}

//********************** Sprite_Actor **********************//

Sprite_Actor.prototype.setActorHome = function(index) {
    this.setHome(Graphics.boxWidth - (Graphics.boxWidth * 0.2) + index * 40 , Graphics.boxHeight / 2 + index * (Graphics.boxHeight / 12.5));
};

//********************** Sprite_Enemy **********************//

Sprite_Enemy.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._enemy = battler;
    this.setHome(Graphics.boxWidth -(Graphics.boxWidth) + battler.screenX() , battler.screenY() + (Graphics.boxHeight - lineHeight * 18 ));
    this._stateIconSprite.setup(battler);
};

//********************** GameOver Bitmap *******************//

Scene_Gameover.prototype.createBackground = function() {
    this._backSprite = new Sprite();
this._backSprite.bitmap = ImageManager.loadBitmap('img/'+ Graphics.boxWidth + "x" + Graphics.boxHeight + '/system/','GameOver');
    this.addChild(this._backSprite);
};