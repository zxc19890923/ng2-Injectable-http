1. app.service.ts

import {Injectable} from "@angular/core";

// http Promise.resolve 对应 subscribe 然后使用 then 获取
// http map 首先要导入map 然后使用subscribe 获取
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
@Injectable()
export class AppService {
    data:Array<Object>;

    constructor(public http:Http) {
    };

    // 定义方法
    getUser() {
        return Promise.resolve(2);
    }

    // 服务方法中使用http模块返回数据
    getHttp() {
        return this.http.get("./data/user.json").map(response => response.json());
    }
}

2. app.component.ts

import {Component, OnInit} from "@angular/core";
// 获取路由传递传递过来的params(id) 增加模块激活的路由(ActivatedRoute)
import {ActivatedRoute} from "@angular/router";
import {AppService} from "./app.service";

@Component({
    selector: "my-info",
    templateUrl: "../templates/about-info.html",
    providers: [AppService]
})

export class AboutInfoComponent implements OnInit {
    id:Object;
    birdthday:Date;
    // 定义一个变量, 获取服务方法取得的数据
    info:Number;
    data:Array<Object>;
    // 初始化变量, 这里必须加修饰词 public private, 初始化服务, 然后使用服务方法,调取数据
    constructor(public route:ActivatedRoute, public infos:AppService) {
        this.id = {};
    }

    // 方法中操作id, 通过id查询信息等等
    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params); //{ id : "xx" }
            this.id = params;
        });

        this.birdthday = new Date(1989, 8, 23);

        // 返回来的是promise 所以使用then 调用服务方法, 返回数据。
        this.infos.getUser().then(info=>this.info = info);

        // 传递过来的不是promise 所以要subscribe执行
        this.infos.getHttp().subscribe(data=>this.data = data);
    }
}
