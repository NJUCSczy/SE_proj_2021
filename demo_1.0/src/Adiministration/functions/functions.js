export const USE_JSON_SERVER=false;

export function getStageByInfo(info){
    if(info===null || info ===undefined)return 0;
    return (
    info.hasOwnProperty('用户申请表') === false  ? -1: //错误状态
    info.hasOwnProperty('委托测试软件功能列表') === false  ? 0: //用户已填写申请表，等待用户填写软件功能列表
    //info.hasOwnProperty('测试部审核委托') === false ? 1: //用户已完成软件功能列表，等待用户上传文件
    info.hasOwnProperty('测试部审核委托') === false ? 2: //用户已上传文件，等待测试部审核
    info['测试部审核委托']['确认意见'] != '可以测试' ? 3 : //测试部驳回
    info.hasOwnProperty('市场部审核委托') === false ? 4 : //测试部审核通过，等待市场部审核
    info['市场部审核委托']['市场部受理意见'] === '不受理' ? 5 : //市场部不受理
    info['市场部审核委托']['市场部受理意见'] === '需进一步审理' ? 6 : //市场部提出进一步审理
    info.hasOwnProperty('报价单') === false ? 7 : //市场部确认受理，等待市场部发起议价
    info['报价单']['用户反馈'] === null ? 8 : //市场部已发起议价，等待用户回复
    info['报价单']['用户反馈'] === '不接受' ? 9 : //客户不接受议价，委托终止
    info['报价单']['用户反馈'] === '再议价' ? 10 : //客户申请再议价
    info['市场部审核委托'].hasOwnProperty('测试项目编号') === false ? 11 : //用户已接受议价，等待市场部人员完成测试申请书
    info.hasOwnProperty('测试合同') === false ? 12 : //市场部人员已完成申请表，等待市场部人员填写测试合同和履行期限
    info['测试合同']['履行期限接受情况'] === null ? 13 : //等待客户接受履行期限
    info['测试合同']['履行期限接受情况'] === '不接受' ? 14 : //客户不接受履行期限，委托终止
    info['测试合同']['履行期限接受情况'] === '申请再议' ? 15 : //客户针对履行期限申请再议
    info['测试合同'].hasOwnProperty('签章') === false ? 16 : //客户接受履行期限，等待市场部填写签章受托人部分
    info['测试合同']['签章'].hasOwnProperty('委托人签章') === false ? 17 : //市场部已填写签章受托人部分，等待客户填写签章委托人部分
    info.hasOwnProperty('保密协议') === false ? 18 : //测试合同已完成，等待市场部填写保密协议
    info['保密协议'].hasOwnProperty('用户部分') === false ? 19 : //市场部已填写保密协议，等待客户填写保密协议
    20//委托完成
    );
}

export function getStatusInfo(info,part=null){  
    var stage=getStageByInfo(info);
    if(stage<0)return null;
    var res='';
    if(part === '软件项目委托测试申请书'){
        if(stage>=11)
        return '已完成'
        else if(stage>=7)
        return '等待市场部完成'
    }
    else if(part === '委托测试软件功能列表'){
        if(stage>=1)
        return '已完成'
        else
        return '尚未创建'
    }
    else if(part === '软件委托测试合同'){
        if(stage>=18)
            return '已完成'
        else if(stage<13)
            return '尚未创建'
    }
    else if(part === '软件项目委托测试保密协议'){
        if(stage>=20)
            return '用户已签署保密协议，委托完成'
        else if(stage<19)
            return '尚未创建'
    }
    switch(stage){
        case -1:res='状态错误';break;
        case 0:res='用户已提交申请表，等待用户填写软件功能列表';break;
        case 1:res='用户已提交软件功能列表，等待用户上传文件';break;
        case 2:res='用户已上传文件，等待测试部审核';break;
        case 3:res='测试部驳回';break;
        case 4:res='测试部审核用户申请通过，等待市场部审核';break;
        case 5:res='市场部不受理用户申请';break;
        case 6:res='市场部对用户申请提出进一步审理';break;
        case 7:res='市场部确认受理用户请求，等待市场部发起议价';break;
        case 8:res='市场部提出议价，等待客户回复';break;
        case 9:res='客户不接受议价，委托终止';break;
        case 10:res='客户提出再议价';break;
        case 11:res='客户已接受议价，等待市场部人员完成测试申请书';break;
        case 12:res='市场部人员已完成申请表，等待市场部人员填写测试合同和履行期限';break;
        case 13:res='等待客户接受履行期限';break;
        case 14:res='客户不接受履行期限，委托终止';break;
        case 15:res='客户针对履行期限申请再议';break;
        case 16:res='客户接受履行期限，等待市场部填写签章受托人部分';break;
        case 17:res='市场部已填写受托人签章，等待客户填写委托人签章';break;
        case 18:res='测试合同已生成，等待测试部填写保密协议';break;
        case 19:res='测试部已填写保密协议，等待客户填写保密协议';break;
        case 20:res='用户已签署保密协议，委托完成';break;
    }
    return res;
}