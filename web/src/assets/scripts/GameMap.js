import { KobGameObject } from "./KobGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends KobGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        // 绝对距离
        this.L = 0;
        this.rows = 13;
        this.cols = 14;

        // 障碍物
        this.walls = [];

        // 内部障碍物数量
        this.inner_walls_count = 20;

        // 创建两条蛇
        this.snakes = [
            new Snake({ id: 0, color: "#4876EC", r: this.rows - 2, c: 1 }, this),
            new Snake({ id: 1, color: "#F94848", r: 1, c: this.cols - 2 }, this),
        ]

        
    }

    // 判断是否连通 起点和终点的横纵坐标
    // flood fill
    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;

        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) return true;
        }

        return false;
    }

    create_walls() {
        // new Wall(0,0,this);
        const g = [];
        for (let r = 0; r < this.rows; r++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false;
            }
        }

        // 四周加上障碍物
        for (let r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true;
        }
        for (let c = 0; c < this.cols; c++) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        // 随机一半  中心对称生成
        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            for (let j = 0; j < 1000; j++) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;
                // 左下角和右上角不能放
                if (r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2) continue;

                g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false;


        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        return true;
    }


    add_listening_events() {
        this.ctx.canvas.focus();

        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if (e.key === 'w') {
                console.log("w");
                snake0.set_direction(0);
            }
            else if (e.key === 'd') {
                console.log("d");
                snake0.set_direction(1);
            }
            else if (e.key === 's') {
                console.log("s");
                snake0.set_direction(2);
            }
            else if (e.key === 'a') {
                console.log("a");
                snake0.set_direction(3);
            }
            else if (e.key === 'ArrowUp') {
                console.log("上");
                snake1.set_direction(0);
            }
            else if (e.key === 'ArrowRight') {
                console.log("右");
                snake1.set_direction(1);
            }
            else if (e.key === 'ArrowDown') {
                console.log("下");
                snake1.set_direction(2);
            }
            else if (e.key === 'ArrowLeft') {
                console.log("左");
                snake1.set_direction(3);
            }
        });
    }

    start() {
        for (let i = 0; i < 1000; i++)
            if (this.create_walls())
                break;

        this.add_listening_events();
    }


    // 判断蛇准备好没有
    check_ready() {
        for (const snake of this.snakes) {
            if (snake.status !== "idle") return false;
            if (snake.direction === -1) return false;
        }

        return true;
    }

    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    // 让两条蛇进入下一个回合
    next_step() {
        for (const snake of this.snakes) {
            snake.next_step();
        }
    }

    check_vaild(cell) {
        // 检测是否合法
        for (const wall of this.walls) {
            if (wall.r === cell.r && wall.c === cell.c) {
                return false;
            }
        }

        for (const snake of this.snakes) {
            let k = snake.cells.length;
            if (!snake.check_tail_increasing()) {
                k --;
            }
            for (let i=0;i<k;i++) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c) {
                    return false;
                }
            }
        }

        return true; 
    }

    update() {
        this.update_size();
        if (this.check_ready()) {
            this.next_step();
        }
        this.render();
    }


    // 渲染
    render() {
        const color_even = "#AAD751", color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }

}