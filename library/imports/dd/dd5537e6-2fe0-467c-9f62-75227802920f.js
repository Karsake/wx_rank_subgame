"use strict";
cc._RF.push(module, 'dd553fmL+BGfJ9idSJ4ApIP', 'RankItem');
// Script/RankItem.js

"use strict";

cc.Class({
    extends: cc.Component,
    name: "RankItem",
    properties: {
        backSprite: cc.Node,
        rankLabel: cc.Label,
        avatarImgSprite: cc.Sprite,
        nickLabel: cc.Label,
        topScoreLabel: cc.Label,
        crownImage: cc.Node
    },
    start: function start() {},


    init: function init(rank, data) {
        var avatarUrl = data.avatarUrl;
        // let nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
        var nick = data.nickname;
        var grade = data.KVDataList.length != 0 ? data.KVDataList[0].value : 0;

        // if (rank % 2 == 0) {
        //     this.backSprite.color = new cc.Color(55, 55, 55, 255);
        // }
        // this.rankLabel.node.color = new cc.Color(255, 255, 255, 255);
        // if (rank == 0) {
        // this.rankLabel.node.color = new cc.Color(255, 0, 0, 255);
        // this.rankLabel.node.setScale(2);
        // } else if (rank == 1) {
        // this.rankLabel.node.color = new cc.Color(255, 255, 0, 255);
        // this.rankLabel.node.setScale(1.6);
        // } else if (rank == 2) {
        // this.rankLabel.node.color = new cc.Color(100, 255, 0, 255);
        // this.rankLabel.node.setScale(1.3);
        // }

        if (rank < 3) {
            this.crownImage.active = true;
            this.rankLabel.node.color = new cc.Color(0, 0, 0, 255);
        } else {
            this.rankLabel.fontSize = 37;
        }
        this.rankLabel.string = (rank + 1).toString();
        this.createImage(avatarUrl);
        this.nickLabel.string = nick;
        this.topScoreLabel.string = "第" + grade.toString() + "关";
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