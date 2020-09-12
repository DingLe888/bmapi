/**
 * 各种校验的方法
 * Created by zhanglin on 2017/7/12.
 */
let Validator = {
    /**
     * 判断是否为空
     */
    isEmpty: (p: string) => {
        if (p == null || p == undefined) {
            return true;
        }
        let param = p.trim();
        if ("" == param || '' == param || param.length <= 0) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 身份证验证
     * @returns {boolean}
     */
    idcardValidator: (idcard: string) => {

        if (Validator.isEmpty(idcard)) {
            return false
        } else {

            let idcard2 = idcard.trim();

            let len = idcard2.length, re;
            if (len == 15)
                re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
            else if (len == 18)
                re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d|[Xx])$/);
            else {

                return false;
            }
            let a = idcard2.match(re);
            if (a != null) {
                let B = false;
                if (len == 15) {
                    let D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
                    B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4]
                        && D.getDate() == a[5];

                } else {
                    let D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
                    B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4]
                        && D.getDate() == a[5];
                }
                if (!B) {
                    return false;
                }
            }

            return true;
        }
    },

    /**
     * 电话验证
     * @returns {boolean}
     */
    phoneValidator: (phone: string) => {
        let result = false;
        if (phone != "" && phone != null) {
            let length = phone.length;
            let reg = /^1\d{10}$/;
            result = length == 11 && reg.test(phone);
        }

        return result;
    },

    /**
     * 姓名验证
     * @returns {boolean}
     */
    nameValidator: (name: string) => {

        if (name != null && name != "" && 2 <= name.length && name.length <= 15) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 数字验证
     * @returns {boolean}
     *
     *   验证数字：^[0-9]*$
         验证n位的数字：^\d{n}$
         验证至少n位数字：^\d{n,}$
         验证m-n位的数字：^\d{m,n}$
         验证零和非零开头的数字：^(0|[1-9][0-9]*)$
         验证有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
         验证有1-3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
         验证非零的正整数：^\+?[1-9][0-9]*$
         验证非零的负整数：^\-[1-9][0-9]*$
         验证非负整数（正整数 + 0） ^\d+$
         验证非正整数（负整数 + 0） ^((-\d+)|(0+))$
    
         非负浮点数（正浮点数 + 0）：^\d+(\.\d+)?$
         正浮点数 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
         非正浮点数（负浮点数 + 0） ^((-\d+(\.\d+)?)|(0+(\.0+)?))$
         负浮点数 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
         浮点数 ^(-?\d+)(\.\d+)?$
    
     */
    numValidator: (num: string) => {
        let numReg = /^(([0-9]+\.[0-9]{1,2})|([0-9]*[1-9][0-9]*\.[0-9]{1,2})|([0-9]*[1-9][0-9]*)|[0-9]*)$/;
        if (!numReg.test(num)) {
            return false;
        }
        return true;
    },

    validNumber_One: (amount: any) => {

        if (amount != null && amount != "") {
            if (/^[0-9]+(.[0-9]{1})?$/.test(amount)) {
                return true
            }
        }

        return false
    },

    amountValidator: (amount: any) => {

        if (amount != null && amount != "") {
            let exp = /^([0-9]\d{0,5})(\.\d{1,2})?$/;
            if (!exp.test(amount + "")) {

                return false;
            }
        }
        return true;
    }
};

export default Validator;