import Snake from "./Snake";

let alltd:Array<any>[] = [];
let randomx:number;
let randomy:number;
let showapple:Boolean = true;
export default class Map{
    height:number;
    width:number;
    constructor(hi:number,wid:number)
    {
        this.height = hi;
        this.width = wid;
    }

    createMap(divName:string){
        const elt = document.getElementById(divName);
        for (let index = 0; index < this.height; index++) {
            const tr = elt?.appendChild(document.createElement("tr"));
            const tdarray = [];
            for (let j = 0; j < this.width; j++) {
                const td = tr?.appendChild(document.createElement("td"));
                tdarray[j] = td;
            }
            alltd[index] = tdarray;
        }
    }
    //产生一个苹果
    showFood(snake:Snake){
        const length = snake.body.length;
        let random = [];
        for (let index = 0; index < this.height; index++) {
            for (let j = 0; j < this.width; j++) {
                if (!snake.body.some(item => item.x === index && item.y === j)){
                    random.push({x:index,y:j});
                } 
            }
        }
        let rondlen = random.length;
        let idx = Math.ceil(rondlen * Math.random());
        randomx = random[idx].x;
        randomy = random[idx].y;
        this.ShowApp = false;
        alltd[randomx][randomy].style.background = "green";
    }

    public get Randomx():number
    {
        return randomx;
    }

    public get Randomy():number{
        return randomy;
    }

    get Showapp():Boolean{
        return showapple;
    }

    set ShowApp(va:Boolean){
        showapple = va;
    }

    //画蛇
    displaySnake(snake:Snake){
        const length = snake.body.length;
        for (let i = 0;i < length;i++)
        {
            const x =  snake.body[i].x;
            const y =  snake.body[i].y;
            if (i === 0){
                alltd[x][y].style.background = "blue";
            }else{
                alltd[x][y].style.background = "red";
            }

        }
    }

    //之前的蛇去掉
    clearSnake(snake:Snake){
        alltd.forEach((value,i)=>{
            value.forEach((v,j) =>{
                if (!(i === randomx && j === randomy)){
                    v.style.background = "";
                }  
            })
        }
        );
    }

    //清除食物
    clearfood(){
        alltd[randomx][randomy].style.background = "";
    }
    
}