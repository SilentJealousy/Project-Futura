?//=============================================================================
// EquipLevel.js
//=============================================================================
 
/*:
 * @plugindesc Change level required to equip a weapon.
 * @author Soul Pharonix
 *
 *
 *
 *
 * @help This plugin will allow you to set a required level for armor and weapons. This will prevent the equipping
 * of armors and weapons unless the actor's level meets the required level
 * use <req_level:40> to set the required level to 40.
 *
 *
 */
 
 
(function() {
 
 
Game_BattlerBase.prototype.canEquipWeapon = function(item) {
  var weaponlevel=0;
  if (item.meta.req_level!=null)
 {weaponlevel=item.meta.req_level;}
  else
  weaponlevel=0;
    return this.isEquipWtypeOk(item.wtypeId) && !this.isEquipTypeSealed(item.etypeId) && this._level>=weaponlevel;
};
 
 
Game_BattlerBase.prototype.canEquipArmor = function(item) {
  var armorlevel=0;
  if (item.meta.req_level != null)
   {armorlevel=item.meta.req_level;}
  else
   {armorlevel=0;}
    return this.isEquipAtypeOk(item.atypeId) && !this.isEquipTypeSealed(item.etypeId) && this._level>=armorlevel;
};
 
 
 
 
})();