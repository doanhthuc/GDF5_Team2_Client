/**
 * Created by GSN on 6/2/2015.
 */

var UID=0;
var userInfo ={
    id:"",
    username:"",
    gem:0,
    gold:0,
    trophy:0,
    clone:function(pk){
        this.username=pk.username;
        this.gold=pk.gold;
        this.gem=pk.gem;
        this.id=pk.id;
        this.trophy=pk.trophy;
    },
    show:function(){
        cc.log(this.username+" "+this.gold+" "+this.gem+" "+this.id+" "+this.trophy);
    }
}
var userCardCollection = {
    id:"",
    cardCollection:[],
    getItemList:function(pk)
    {
        this.cardCollection.push();
    }
}
var res = {
    //font
    FONT_BITMAP_NUMBER_1: 'fonts/number_1.fnt',
    FONT_BITMAP_DICE_NUMBER: 'fonts/diceNumber.fnt',
    //zcsd
    //screen
    ZCSD_SCREEN_MENU: 'zcsd/screen_menu.json',
    ZCSD_SCREEN_NETWORK: 'zcsd/screen_network.json',
    ZCSD_SCREEN_LOCALIZATION: 'zcsd/screen_localize.json',
    ZCSD_SCREEN_DRAGON_BONES: 'zcsd/screen_dragon_bones.json',
    ZCSD_SCREEN_DECRYPTION: 'zcsd/screen_decryption.json',
    ZCSD_SCREEN_ZALO: 'zcsd/screen_zalo.json',
    MAIN_SCREEN: 'ui/main/MainScene.json',
    BOTTOM_NAV: 'ui/main/bottom/bottomNav.json',
    LOBBY_NODE: 'ui/lobby/LobbyHomeNode.json',
    TREASURE_POPUP_NODE: 'ui/lobby/treasurePopup.json',


    //popup
    ZCSD_POPUP_MINI_GAME: 'zcsd/game/mini_game/PopupMiniGame.json',

    LOGINSCENCE: "ui/login/Login.json",
    //images
    Slot1_png: 'zcsd/slot1.png',
    ACTIVE_TAB_BG: '/assets/lobby/lobby_page_btn_selecting.png'

};

var g_resources = [
    'CloseNormal.png',
    'CloseSelected.png',
    'game/animation/character/chipu/skeleton.xml',
    'game/animation/eff_dice_number/skeleton.xml',
    'game/animation/effDiceNumber/skeleton.xml',
    'game/animation/firework_test/skeleton.xml',
    'game/animation/ruongngusac/skeleton.xml',
    'game/animation/Dragon/skeleton.json',
    'game/animation/DragonBoy/skeleton.json',
    'game/animation/lobby_girl/skeleton.xml',
    'config.json',
    'Default/Button_Disable.png',
    'Default/Button_Normal.png',
    'Default/Button_Press.png',

    'favicon.ico',
    'HelloWorld.png',
    'fonts/diceNumber.fnt',
    'fonts/diceNumber.png',
    'fonts/eff_number.fnt',
    'fonts/eff_number.png',
    'fonts/number_1.fnt',
    'fonts/number_1.png',
    'game/animation/character/chipu/texture.plist',
    'game/animation/character/chipu/texture.png',
    'game/animation/eff_dice_number/texture.plist',
    'game/animation/eff_dice_number/texture.png',
    'game/animation/effDiceNumber/texture.plist',
    'game/animation/effDiceNumber/texture.png',
    'game/animation/firework_test/texture.plist',
    'game/animation/firework_test/texture.png',
    'game/animation/ruongngusac/texture.xml',
    'game/animation/ruongngusac/texture.png',
    'game/animation/Dragon/texture.json',
    'game/animation/Dragon/texture.png',
    'game/animation/DragonBoy/texture.json',
    'game/animation/DragonBoy/texture.png',
    'game/animation/lobby_girl/texture.plist',
    'game/animation/lobby_girl/texture.png',
    'ipConfig.json',
    'localize/config.json',
    'localize/vi.txt',
    'localize/en.txt',
    'shaders/change_color.fsh',
    'zcsd/screen_decryption.json',
    'zcsd/screen_dragon_bones.json',
    'zcsd/screen_localize.json',
    'zcsd/screen_menu.json',
    'zcsd/screen_network.json',
    'zcsd/screen_zalo.json',
];
