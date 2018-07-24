(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameOverRank.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd97bdIn/jtJmpn7qz0kKhI5', 'GameOverRank', __filename);
// Script/GameOverRank.js

"use strict";

cc.Class({
    extends: cc.Component,
    name: "GameOverRank",
    properties: {
        backSprite: cc.Node,
        rankLabel: cc.Label,
        avatarImgSprite: cc.Sprite,
        nickLabel: cc.Label,
        topScoreLabel: cc.Label
    },

    init: function init(rank, data, isPlayer) {
        var avatarUrl = data.avatarUrl;
        // let nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
        var nick = data.nickname;
        var grade = data.KVDataList.length != 0 ? data.KVDataList[0].value : 0;

        if (rank % 2 == 0) {
            this.backSprite.color = new cc.Color(255, 255, 255, 255);
        }
        if (isPlayer) {
            this.rankLabel.node.color = new cc.Color(0, 255, 0, 255);
        }
        this.rankLabel.string = (rank + 1).toString();
        this.createImage(avatarUrl);
        this.nickLabel.string = nick;
        this.topScoreLabel.string = grade.toString();
    },
    createImage: function createImage(avatarUrl) {
        var _this = this;

        if (window.wx != undefined) {
            try {
                var image = wx.createImage();
                image.onload = function () {
                    try {
                        var texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        _this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        cc.log(e);
                        _this.avatarImgSprite.node.active = false;
                    }
                };
                image.src = avatarUrl;
            } catch (e) {
                cc.log(e);
                this.avatarImgSprite.node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, function (err, texture) {
                _this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameOverRank.js.map
        