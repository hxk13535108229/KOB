const KOB_GAME_OBJECTS =[];

export class KobGameObject {
    constructor() {
        KOB_GAME_OBJECTS.push(this);
        this.has_called_start = false;

        // 两帧之间的时间间隔
        this.timedelta=0;
    }

    start() {
        // 执行一次

    }

    update() {
        // 每一帧执行一次
    }

    on_destroy() {
        // 删除之前执行

    }

    destroy() {
        this.on_destroy();

        for (let i in KOB_GAME_OBJECTS) {
            const obj =KOB_GAME_OBJECTS[i];
            if (obj == this) {
                KOB_GAME_OBJECTS.splice(i);
                break;
            }
        }
    }
}

// 上一次执行的时刻
let last_timestamp;
const step = timestamp=>{
    for (let obj of KOB_GAME_OBJECTS) {
        if (!obj.has_called_start){
            obj.has_called_start=true;
            obj.start();
        }else {
            obj.timedelta=timestamp-last_timestamp;
            obj.update();
        }
    }

    last_timestamp=timestamp;
    requestAnimationFrame(step)
}

requestAnimationFrame(step)