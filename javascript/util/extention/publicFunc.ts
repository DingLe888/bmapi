

/**
*  在字符串某个位置插入一个字符串
*/
export function insertStr(soure: string, position: number, str: string) {
    if (soure.length <= position || soure.slice(position, position + 1) == str) {
        return soure
    }

    let result = soure.slice(0, position) + str + soure.slice(position);
    return result
}


/**
*  获取文件类型
*/
export const getFileType = (name: string) => {
    if (!name) return '*/*';
    var imgType = ["gif", "jpeg", "jpg", "bmp", "png"];
    var videoType = ["avi", "wmv", "mkv", "mp4", "mov", "rm", "3gp", "flv", "mpg", "rmvb"];
    if (RegExp("\.(" + imgType.join("|") + ")$", "i").test(name.toLowerCase())) {
        return 'image/*';
    } else if (RegExp("\.(" + videoType.join("|") + ")$", "i").test(name.toLowerCase())) {
        return 'video/*';
    } else {
        return 'file/*';
    }
}