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
        // 下一步的目标位置
        this.next_cell=null; 

        this.speed = 5;
        this.direction =-1; // 0,1,2,3代表上右下左
        this.status="idle";  // idle：静止 move：移动中 die：死亡

        this.dr=[-1,0,1,0];
        this.dc=[0,1,0,-1];

        this.step=0;
        // 误差
        this.eps=1e-2;
    }

   
    start() {

    }

    set_direction(d) {
        this.direction = d;
    }


   

    // 更新蛇的状态
    next_step() {
        const d=this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.direction=-1;
        this.status="move";
        this.step++;

        // 头部抛出新球
        const k = this.cells.length;
        for (let i = k; i > 0; i -- ) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

    }


    update_move() {
        const dx=this.next_cell.x-this.cells[0].x;
        const dy=this.next_cell.y-this.cells[0].y;
        const distance = Math.sqrt(dx*dx+dy*dy);

        if (distance<this.eps) {
            // 已经重合
            this.cells[0]=this.next_cell;
            this.next_cell=null;
            this.status="idle";
        }else {
            const move_distance = this.speed * this.timedelta / 1000;  // 每两帧之间走的距离
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;
        }
    }

    // 每一帧执行一次
    update() {
        if(this.status === "move") {
            this.update_move();
        }
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