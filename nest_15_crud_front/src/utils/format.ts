/**
 * @Desc:时间格式化
 *
 * */
import {computed} from "vue";
import dayjs from "dayjs";

export function dateFormat(val: Date) {// 参数为时间戳，number
    return computed(() => {
        // format里的格式：年-月-日 星期 时:分:秒
        return dayjs(val).format('YYYY-MM-DD dddd HH:mm:ss');// format里设定时间格式
    });
}
