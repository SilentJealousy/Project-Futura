//=============================================================================
// BattleVoice.js
//=============================================================================

/*:
 * @plugindesc play voice SE at battle when actor does spcified action
 * @author Sasuke KANNAZUKI
 * 
 * @param pitch
 * @desc pitch of SEs. this setting is common among all voice SEs.
 * @default 100
 *
 * @param volume
 * @desc volume of SEs. this setting is common among all  voice SEs.
 * @default 90
 * 
 * @help This plugin does not provide plugin commands.
 * 
 * note specification:
 * write down each actor's note at following format to set SE filename.
 * <attackVoice:filename>  plays when actor does normal attack.
 * <recoverVoice:filename>   plays when actor uses HP recovering magic.
 * <friendMagicVoice:filename> plays when actor spells magic for friend
 *  except HP recovering. if this is not set but <skillVoice:filename> is set,
 *   it plays <magicVoice:filename> setting file.
 * <magicVoice:filename>   plays when actor spells magic(except for friend).
 * <skillVoice:filename>   plays when actor uses special skill except magic.
 * <damageVoice:filename>    plays when actor takes damage.
 * <defeatedVoice:filename>   plays when actor is died.
 * <victoryVoice:filename>   plays when battle finishes.
 *  if plural actors attend the battle, randomly selected actor's SE is adopted.
 *
 */
(function() {

  //
  // process parameters
  //
  var parameters = PluginManager.parameters('BattleVoice');
  var pitch = Number(parameters['pitch']) || 100;
  var volume = Number(parameters['volume']) || 90;

  AudioManager.createAudioByFileame = function(name){
    var audio = {};
    audio.name = name;
    audio.pitch = pitch;
    audio.volume = volume;
    return audio;
  };

  //
  // play actor voice
  //
  SoundManager.playActorVoice = function(actor, type){
    var name = '';
    switch(type){
      case 'attack':
        name = actor.meta.attackVoice;
        break;
      case 'recover':
        name = actor.meta.recoverVoice;
        break;
      case 'friendmagic':
        name = actor.meta.friendMagicVoice || actor.meta.magicVoice;
        break;
      case 'magic':
        name = actor.meta.magicVoice;
        break;
      case 'skill':
        name = actor.meta.skillVoice;
        break;
      case 'damage':
        name = actor.meta.damageVoice;
        break;
      case 'dead':
        name = actor.meta.defeatedVoice;
        break;
      case 'victory':
        name = actor.meta.victoryVoice;
        break;
    }
    if(name){
      var audio = AudioManager.createAudioByFileame(name);
      AudioManager.playSe(audio);
    }
  };

  //
  // functions for call actor voice.
  //
  var _Game_Actor_performAction = Game_Actor.prototype.performAction;
  Game_Actor.prototype.performAction = function(action) {
    _Game_Actor_performAction.call(this, action);
    if (action.isAttack()) {
      SoundManager.playActorVoice(this.actor(), 'attack');
    } else if (action.isMagicSkill() && action.isHpRecover()) {
      SoundManager.playActorVoice(this.actor(), 'recover');
    } else if (action.isMagicSkill() && action.isForFriend()) {
      SoundManager.playActorVoice(this.actor(), 'friendmagic');
    } else if (action.isMagicSkill()) {
      SoundManager.playActorVoice(this.actor(), 'magic');
    } else if (action.isSkill() && !action.isGuard()) {
      SoundManager.playActorVoice(this.actor(), 'skill');
    }
  };

  var _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
  Game_Actor.prototype.performDamage = function() {
    _Game_Actor_performDamage.call(this);
    SoundManager.playActorVoice(this.actor(), 'damage');
  };

  var _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
  Game_Actor.prototype.performCollapse = function() {
    _Game_Actor_performCollapse.call(this);
    if ($gameParty.inBattle()) {
      SoundManager.playActorVoice(this.actor(), 'dead');
    }
  };

  var _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function() {
    var index = Math.randomInt($gameParty.aliveMembers().length);
    var actor = $gameParty.aliveMembers()[index].actor();
    SoundManager.playActorVoice(actor, 'victory');
    _BattleManager_processVictory.call(this);
  };

})();
