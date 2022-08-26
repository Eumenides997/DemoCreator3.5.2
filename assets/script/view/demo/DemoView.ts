import { Color, ERigidBody2DType, EventTouch, instantiate, Node, NodeEventType, Vec2 } from 'cc';
import { GTextField } from 'fairygui-cc';
import { PrefabEnum } from '../../auto/enum/PrefabEnum';
import App from '../../core/App';
import BaseView from '../../core/base/BaseView';
import CCNode from '../../core/base/CCNode';
import QDictionary from '../../core/base/QDictionary';
import { Layer } from '../../core/manager/LayerManager';
import UIUtils from '../../core/UIUtils';
import EventDefine from '../../define/EventDefine';
import GameMath from '../../logic/GameMath';
import ResultView from '../result/ResultView';
import BattleView from './BattleView';
import DemoBlock from './DemoBlock';

export default class DemoView extends BaseView {
    private nodeArr: Array<Node> = [];
    private ctrlBox: CCNode = null;
    private blockArr: QDictionary<DemoBlock> = new QDictionary<DemoBlock>();
    private blockCreateCount: number = 0;
    private block: DemoBlock = null;
    private stageWidth: number = App.stageManager.width;
    private stageHeight: number = App.stageManager.height;
    private clickPos: Vec2 = null;
    private gameState: GameState = null;
    private score: number = 0;
    private txtScore: GTextField = null;

    public init() {
        this.setBattleView();
        this.gameStart();
        this.setEvents();
    }

    public setTxtScoreNode(txtScore: GTextField) {
        this.txtScore = txtScore;
        this.setTxtScore();
    }

    public reStart() {
        this.clearBlockArr();
        this.gameStart();
    }

    private gameStart() {
        this.gameState = GameState.start;
    }

    private setCtrlBox() {
        this.ctrlBox = new CCNode();
        this.ctrlBox.width = App.stageManager.width;
        this.ctrlBox.height = App.stageManager.height;
        this.nodeArr.push(this.ctrlBox.node);
        App.layerManager.layerArr[Layer.ctrl].addChild(this.ctrlBox.node);
    }

    private setBattleView() {
        this.setGround();
        this.setLeftWall();
        this.setRightWall();
        this.setCtrlBox();
    }

    private setEvents() {
        this.on(EventDefine.appUpdate, this.onUpdate, this);
        this.on(EventDefine.demoGameOver, this.onGameOver, this);
        this.ctrlBox.node.on(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this.ctrlBox.node.on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this.ctrlBox.node.on(NodeEventType.MOUSE_WHEEL, this.onMouseWheel, this);
    }

    public destory() {
        this.removeAllEvents();
        this.clearBlockArr();
        this.nodeArr.forEach(p => {
            p.removeFromParent();
            p.destroy();
        });
    }

    private onUpdate(deltaTime: number) {
        if (this.gameState != GameState.start) {
            return;
        }
        if (this.blockArr.length == 0) {
            return;
        }
        let blockArrSortByY: QDictionary<Array<Array<string | number>>> = new QDictionary<Array<Array<string | number>>>();
        for (let key in this.blockArr.datas) {
            let block: DemoBlock = this.blockArr.datas[key];
            if (block.isContact) {
                for (let i = 0; i < block.spriteSplashArr.length; i++) {
                    let blockY: number = Math.floor(UIUtils.toWorldPosition(block.spriteSplashArr[i].ccNode.node).y);
                    let blockYArr: Array<Array<string | number>> = blockArrSortByY.get(blockY);
                    if (blockYArr) {
                        blockYArr.push([key, i]);
                    } else {
                        blockArrSortByY.set(blockY, [[key, i]]);
                    }
                }
            }
        }
        for (let key in blockArrSortByY.datas) {
            let blockYArr: Array<Array<string | number>> = blockArrSortByY.datas[key];
            let nearlyNumCount: number = 21;
            for (let i = 0; i < nearlyNumCount; i++) {
                let blockY: number = Number(key);
                let blockYArrDiff1: Array<Array<string | number>> = blockArrSortByY.get(blockY + i);
                let blockYArrDiff2: Array<Array<string | number>> = blockArrSortByY.get(blockY - i);
                if (blockYArrDiff1) {
                    blockYArr = blockYArr.concat(blockYArrDiff1);
                }
                if (blockYArrDiff2) {
                    blockYArr = blockYArr.concat(blockYArrDiff2);
                }
            }
            blockYArr = GameMath.getNoRepeatArr(blockYArr);
            if (blockYArr.length > 7) {
                this.removeSpriteFormBlockArr(blockYArr);
            }
        }
        for (let key in this.blockArr.datas) {
            let block: DemoBlock = this.blockArr.datas[key];
            if (block.refreshBlock()) {
                block.removeSelf();
                this.blockArr.remove(key);
            }
        }
    }

    private removeSpriteFormBlockArr(blockYArr: Array<Array<string | number>>) {
        blockYArr.forEach(p => {
            let block: DemoBlock = this.blockArr.get(p[0]);
            if (block && !block.removeSpriteSplash([Number(p[1])])) {
                block.removeSelf();
                this.blockArr.remove(p[0]);
            }
        });
        this.score += blockYArr.length;
        this.setTxtScore();
    }

    private setTxtScore() {
        if (this.txtScore) {
            this.txtScore.text = this.score + '';
        }
    }

    public onGameOver() {
        if (this.gameState == GameState.gameover) {
            return;
        }
        this.gameState = GameState.gameover;
        setTimeout(() => {
            this.dropBlock();
        }, 0);
        this.ctrlBox.removeFromParent();
        App.uiManager.showUI(ResultView);
        App.uiManager.closeUI(BattleView);
    }

    private clearBlockArr() {
        for (let key in this.blockArr.datas) {
            let block: DemoBlock = this.blockArr.datas[key];
            if (block) {
                block.removeSelf();
                this.blockArr.remove(key);
            }
        }
    }

    private onTouchStart(e: EventTouch) {
        if (this.gameState == GameState.gameover) {
            return;
        }
        this.clickPos = UIUtils.clickLocation(e);
    }

    private onTouchEnd(e: EventTouch) {
        if (this.gameState == GameState.gameover) {
            return;
        }
        if (!this.clickPos) {
            return;
        }
        let pos = UIUtils.clickLocation(e);
        let diffX = Math.abs(pos.x - this.clickPos.x);
        let diffY = Math.abs(pos.y - this.clickPos.y);
        if (diffX > 100 || diffY < 100) {
            this.setBlock();
        } else {
            this.dropBlock();
        }
        this.clickPos = null;
    }

    private onMouseWheel() {
        if (this.gameState == GameState.gameover) {
            return;
        }
        this.rotateBlock();
    }

    private setBlock() {
        if (!this.block) {
            if (!this.isAllBlockArrContacted) {
                return;
            }
            let blockId: string = this.blockCreateCount + '';
            let block = new DemoBlock(blockId);
            this.blockCreateCount++;
            this.blockCreateCount %= 1000000000;
            this.block = block;
            this.block.setBlockRigidBody2DType(ERigidBody2DType.Static);
            this.blockArr.set(blockId, this.block);
            App.layerManager.layerArr[Layer.cocosUI].addChild(this.block.node);
        }
        let clickPos = UIUtils.clickPosToAppViewNodePos(this.clickPos.x, this.clickPos.y);
        this.block.setBlockPos(clickPos.x, App.stageManager.height / 2 - 200);
        this.correctBolckPos();
    }

    private dropBlock() {
        if (!this.block) {
            return;
        }
        this.block.setBlockRigidBody2DType(ERigidBody2DType.Dynamic);
        this.block = null;
    }

    private get isAllBlockArrContacted(): boolean {
        let isAllBlockArrContacted: boolean = true;
        for (let key in this.blockArr.datas) {
            let block: DemoBlock = this.blockArr.get(key);
            if (!block.isContact) {
                isAllBlockArrContacted = false;
                break;
            }
        }
        return isAllBlockArrContacted;
    }

    private rotateBlock() {
        if (!this.block) {
            return;
        }
        this.block.setBlockDiffAngle(90);
        this.correctBolckPos();
    }

    private correctBolckPos() {
        let leftX: number = 0;
        let rightX: number = 0;
        leftX = rightX = UIUtils.toWorldPosition(this.block.spriteSplashArr[0].ccNode.node).x;
        for (let i = 1; i < this.block.spriteSplashArr.length; i++) {
            let blockX: number = Math.floor(UIUtils.toWorldPosition(this.block.spriteSplashArr[i].ccNode.node).x);
            if (blockX < leftX) {
                leftX = blockX;
            } else if (blockX > rightX) {
                rightX = blockX;
            }
        }
        let blockWidthDiff: number = this.block.spriteSplashArr[0].ccNode.width / 2;
        leftX -= blockWidthDiff;
        rightX += blockWidthDiff;
        let leftDiffX: number = leftX - 0;
        let rightDiffX: number = rightX - this.stageWidth;
        if (leftDiffX < 0) {
            this.block.setBlockDiffX(leftDiffX * -1);
        } else if (rightDiffX > 0) {
            this.block.setBlockDiffX(rightDiffX * -1);
        }
    }

    private setGround() {
        this.setWall(this.stageWidth, 10, 0, (this.stageHeight / 2) * -1 - 5);
    }

    private setLeftWall() {
        this.setWall(10, this.stageHeight, (this.stageWidth / 2) * -1 - 5, 0);
    }

    private setRightWall() {
        this.setWall(10, this.stageHeight, this.stageWidth / 2 + 5, 0);
    }

    private setWall(width: number, height: number, x: number, y: number, color: Color = Color.GRAY) {
        let prefabData = App.prefabManager.prefabArr.get(PrefabEnum.Box2D);
        let ccNode = new CCNode(instantiate(prefabData.prefab));
        ccNode.rigidBody2DType = ERigidBody2DType.Static;
        ccNode.width = width;
        ccNode.height = height;
        ccNode.boxCollider2DWidth = width;
        ccNode.boxCollider2DHeight = height;
        ccNode.x = x;
        ccNode.y = y;
        ccNode.spriteColor = color;
        this.nodeArr.push(ccNode.node);
        App.layerManager.layerArr[Layer.cocosUI].addChild(ccNode.node);
    }
}

export enum GameState {
    start,
    gameover,
}
