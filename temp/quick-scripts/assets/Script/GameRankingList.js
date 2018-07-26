(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameRankingList.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a0ea2Faum1JDKkSr0Ka631L', 'GameRankingList', __filename);
// Script/GameRankingList.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        scrollViewContent: cc.Node,
        prefabRankItem: cc.Prefab,
        loadingLabel: cc.Node //加载文字
    },

    start: function start() {
        var _this = this;

        this.removeChild();
        if (window.wx != undefined) {
            window.wx.onMessage(function (data) {
                cc.log("接收主域发来消息：", data);
                if (data.messageType == 0) {
                    //移除排行榜
                    _this.removeChild();
                } else if (data.messageType == 1) {
                    //获取好友排行榜
                    _this.fetchFriendData(data.MAIN_MENU_NUM);
                } else if (data.messageType == 3) {
                    //提交得分
                    _this.submitScore(data.MAIN_MENU_NUM, data.score);
                } else if (data.messageType == 5) {
                    //获取群排行榜
                    _this.fetchGroupFriendData(data.MAIN_MENU_NUM, data.shareTicket);
                }
            });
        } else {
            this.fetchFriendData(1000);
        }
    },
    submitScore: function submitScore(MAIN_MENU_NUM, score) {
        //提交得分
        if (window.wx != undefined) {
            window.wx.getUserCloudStorage({
                // 以key/value形式存储
                keyList: [MAIN_MENU_NUM],
                success: function success(getres) {
                    console.log('getUserCloudStorage', 'success', getres);
                    if (getres.KVDataList.length != 0) {
                        if (getres.KVDataList[0].value > score) {
                            return;
                        }
                    }
                    // 对用户托管数据进行写数据操作
                    window.wx.setUserCloudStorage({
                        KVDataList: [{ key: MAIN_MENU_NUM, value: "" + score }],
                        success: function success(res) {
                            console.log('setUserCloudStorage', 'success', res);
                        },
                        fail: function fail(res) {
                            console.log('setUserCloudStorage', 'fail');
                        },
                        complete: function complete(res) {
                            console.log('setUserCloudStorage', 'ok');
                        }
                    });
                },
                fail: function fail(res) {
                    console.log('getUserCloudStorage', 'fail');
                },
                complete: function complete(res) {
                    console.log('getUserCloudStorage', 'ok');
                }
            });
        } else {
            cc.log("提交得分:" + MAIN_MENU_NUM + " : " + score);
        }
    },
    removeChild: function removeChild() {
        this.node.removeChildByTag(1000);
        this.scrollViewContent.active = false;
        this.scrollViewContent.removeAllChildren();
        this.loadingLabel.string = "玩命加载中...";
        this.loadingLabel.active = true;
    },
    fetchFriendData: function fetchFriendData(MAIN_MENU_NUM) {
        var _this2 = this;

        this.removeChild();
        this.scrollViewContent.active = true;
        if (window.wx != undefined) {
            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                success: function success(userRes) {
                    _this2.loadingLabel.active = false;
                    console.log('success', userRes.data);
                    var userData = userRes.data[0];
                    //取出所有好友数据
                    wx.getFriendCloudStorage({
                        keyList: [MAIN_MENU_NUM],
                        success: function success(res) {
                            console.log("wx.getFriendCloudStorage success", res);
                            var data = res.data;
                            data.sort(function (a, b) {
                                if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                    return 0;
                                }
                                if (a.KVDataList.length == 0) {
                                    return 1;
                                }
                                if (b.KVDataList.length == 0) {
                                    return -1;
                                }
                                return b.KVDataList[0].value - a.KVDataList[0].value;
                            });
                            var temp;
                            if (data.length > 5) {
                                temp = 5;
                            } else {
                                temp = data.length;
                            } // 翻页功能，暂时只有一页****************SHOULD BE FIXED IMMEDIATELY ********************
                            for (var i = 0; i < temp; i++) {
                                var playerInfo = data[i];
                                var item = cc.instantiate(_this2.prefabRankItem);
                                item.getComponent('RankItem').init(i, playerInfo);
                                _this2.scrollViewContent.addChild(item);
                                item.setPosition(0, -65 - 132 * i);
                                if (data[i].avatarUrl == userData.avatarUrl) {
                                    var userItem = cc.instantiate(_this2.prefabRankItem);
                                    userItem.getComponent('RankItem').init(i, playerInfo);
                                    userItem.y = -300;
                                    _this2.node.addChild(userItem, 1, 1000);
                                }
                            }
                        },
                        fail: function fail(res) {
                            console.log("wx.getFriendCloudStorage fail", res);
                            _this2.loadingLabel.string = "数据加载失败，请检测网络，谢谢。";
                        }
                    });
                },
                fail: function fail(res) {
                    _this2.loadingLabel.string = "数据加载失败，请检测网络，谢谢。";
                }
            });
        }
    },
    fetchGroupFriendData: function fetchGroupFriendData(MAIN_MENU_NUM, shareTicket) {
        var _this3 = this;

        console.log("获取群排行");
        this.removeChild();
        this.scrollViewContent.active = true;
        if (window.wx != undefined) {
            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                success: function success(userRes) {
                    console.log('success', userRes.data);
                    var userData = userRes.data[0];
                    //取出所有好友数据
                    wx.getGroupCloudStorage({
                        shareTicket: shareTicket,
                        keyList: [MAIN_MENU_NUM],
                        success: function success(res) {
                            console.log("wx.getGroupCloudStorage success", res);
                            _this3.loadingLabel.active = false;
                            var data = res.data;
                            data.sort(function (a, b) {
                                if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                    return 0;
                                }
                                if (a.KVDataList.length == 0) {
                                    return 1;
                                }
                                if (b.KVDataList.length == 0) {
                                    return -1;
                                }
                                return b.KVDataList[0].value - a.KVDataList[0].value;
                            });
                            for (var i = 0; i < data.length; i++) {
                                var playerInfo = data[i];
                                var item = cc.instantiate(_this3.prefabRankItem);
                                item.getComponent('RankItem').init(i, playerInfo);
                                _this3.scrollViewContent.addChild(item);
                                if (data[i].avatarUrl == userData.avatarUrl) {
                                    var userItem = cc.instantiate(_this3.prefabRankItem);
                                    userItem.getComponent('RankItem').init(i, playerInfo);
                                    userItem.y = -300;
                                    _this3.node.addChild(userItem, 1, 1000);
                                }
                            }
                        },
                        fail: function fail(res) {
                            console.log("wx.getFriendCloudStorage fail", res);
                            _this3.loadingLabel.string = "数据加载失败，请检测网络，谢谢。";
                        }
                    });
                },
                fail: function fail(res) {
                    _this3.loadingLabel.string = "数据加载失败，请检测网络，谢谢。";
                }
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
        //# sourceMappingURL=GameRankingList.js.map
        