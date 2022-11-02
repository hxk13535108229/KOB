import { KobGameObject } from "./KobGameObject";
import { Cell } from "./Cell";

export class Snake extends KobGameObject {
    constructor(info,gamemap) {
        super();

        // 蛇id
        this.id=info.id;
        this.color=info.color;
        this.gamemap=gamemap;

        // 存放蛇的身体 cells[0]存放蛇头
        this.cells = [new Cell(info.r,info.c)];

        this.speed = 5;

        this.direction =-1; // 0,1,2,3代表上右下左
        this.status="idle";  // idle：静止 move：移动中 die：死亡

    }

    start() {

    }

    // 更新蛇的状态
    next_step() {
        
    }


    update_move() {
        // this.cells[0].x+=this.speed*this.timedelta/1000;
    }

    update() {
        this.update_move();
        this.render();
    }

    render(){
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;
        for (const cell of this.cells) {
            // 画圆弧
            ctx.beginPath();
            ctx.arc(cell.x*L,cell.y*L,L/2,0,Math.PI*2);
            ctx.fill();
        }
    }
}