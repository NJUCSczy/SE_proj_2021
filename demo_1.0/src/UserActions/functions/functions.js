export const USE_JSON_SERVER=false;
export var REMOTE_SERVER='http://210.28.133.13:21250'
//export var REMOTE_SERVER='http://localhost:32000'

export function getStageByInfo(info){
    if(info===null || info ===undefined)return 0;
    return (
    info.hasOwnProperty('用户申请表') === false  ? -1: //错误状态
    info.hasOwnProperty('委托测试软件功能列表') === false  ? 0: //用户已填写申请表，等待用户填写软件功能列表
    //info.hasOwnProperty('测试部审核委托') === false ? 1: //用户已完成软件功能列表，等待用户上传软件文档
    //info.hasOwnProperty('测试部审核委托') === false ? 2: //用户已上传软件文档，等待用户提交样品
    info.hasOwnProperty('测试部审核委托') === false ? 3: //用户已提交样品，等待测试部审核
    info['测试部审核委托']['确认意见'] != '可以测试' ? 4 : //测试部驳回
    info.hasOwnProperty('市场部审核委托') === false ? 5 : //测试部审核通过，等待市场部审核
    info['市场部审核委托']['市场部受理意见'] === '不受理' ? 6 : //市场部不受理
    info['市场部审核委托']['市场部受理意见'] === '需进一步审理' ? 7 : //市场部提出进一步审理
    info.hasOwnProperty('报价单') === false ? 8 : //市场部确认受理，等待市场部发起议价
    info['报价单']['用户反馈'] === null ? 9 : //市场部已发起议价，等待用户回复
    info['报价单']['用户反馈'] === '不接受' ? 10 : //客户不接受议价，委托终止
    info['报价单']['用户反馈'] === '再议价' ? 11 : //客户申请再议价
    info['市场部审核委托'].hasOwnProperty('测试项目编号') === false ? 12 : //用户已接受议价，等待市场部人员完成测试申请书
    info.hasOwnProperty('测试合同') === false ? 13 : //市场部人员已完成申请表，等待市场部人员填写测试合同和履行期限
    info['测试合同']['履行期限接受情况'] === null ? 14 : //等待客户接受履行期限
    info['测试合同']['履行期限接受情况'] === '不接受' ? 15 : //客户不接受履行期限，委托终止
    info['测试合同']['履行期限接受情况'] === '申请再议' ? 16 : //客户针对履行期限申请再议
    info['测试合同'].hasOwnProperty('签章') === false ? 17 : //客户接受履行期限，等待市场部填写签章受托人部分
    info['测试合同']['签章'].hasOwnProperty('委托人签章') === false ? 18 : //市场部已填写签章受托人部分，等待客户填写签章委托人部分
    //info.hasOwnProperty('保密协议') === false ? 19 : //测试合同已完成，等待市场部填写保密协议
    //info['保密协议'].hasOwnProperty('用户部分') === false ? 20 : //市场部已填写保密协议，等待客户填写保密协议
    21//委托完成
    );
}

export function getStageByDelegationState(state){
    switch(state){
        case 'ERROR':return -1;//错误状态
        case 'UPLOAD_FUNCTION_TABLE':return 0;//已经填写申请表，等待功能表
        case 'UPLOAD_FILES':return 1;//已经填写功能表，等待上传软件文档
        case 'UPLOAD_SAMPLE':return 2;//已经上传软件文档，等待提交样品
        case 'AUDIT_TEST_APARTMENT':return 3;//已经上传文件，等待测试部审核
        case 'AUDIT_TEST_APARTMENT_DENIED':return 4;//测试部拒绝
        case 'AUDIT_MARKET_APARTMENT':return 5;//测试部审核通过，等待市场部审核
        case 'AUDIT_MARKET_APARTMENT_DENIED':return 6;//市场部拒绝
        case 'AUDIT_MARKET_APARTMENT_FURTHER':return 7;//市场部进一步审理
        case 'QUOTATION_MARKET':return 8;//市场部审理通过，等待议价
        case 'QUOTATION_USER':return 9;//用户评估议价
        case 'QUOTATION_USER_DENIED':return 10;//用户拒绝价格
        case 'QUOTATION_USER_APPLICATION':return 11;//用户申请再次议价
        case 'TEST_MARKET_APPLICATION':return 12;//用户接受议价，等待市场部完成测试申请表
        case 'TEST_MARKET_CONTRACT':return 13;//市场部完成测试申请表，等待市场部完成合同
        case 'PARTYB_CREATE_CONTRACT_AND_DRAFT_PERFORMANCE_TERM':return 14;//市场部已经拟写履行期限﹖等待用户回复履行期限
        case 'PARTYB_UPDATE_PERFORMANCE_TERM':return 14;//市场部已经修改履行期限﹐等待用户回复履行期限
        case 'PARTYA_REJECT_PERFORMANCE_TERM_TO_END':return 15;//用户已经拒绝履行期限﹐合同被删除,委托结束
        case 'PARTYA_REJECT_PERFORMANCE_TERM_FOR_MODIFICATION':return 16;//用户已经申请再议履行期限﹐等待市场部修改履行期限
        case 'PARTYA_ACCEPT_PERFORMANCE_TERM':return 17;//用户已经同意履行期限﹐等待市场部填写测试合同
        case 'PARTYB_ADD_CONTRACT_TABLE':return 18;//市场部已经填写测试合同·等待用户填写测试合同
        case 'PARTYA_ADD_CONTRACT_TABLE':return 19;//用户已经填写测试合同·等待市场部下载未签订合同
        case 'PARTYB UPLOAD_SIGNED_CONTRACT':return 21;//市场部已经上传已签订合同
        default:return -1;
    }
}

export function getStatusInfo(info,part=null){  
    var stage=getStageByInfo(info);
    return getDescriptionByStage(stage,part);
}

export function getStatusByDelegationState(state,part=null){
    var stage=getStageByDelegationState(state);
    //console.log(stage,part)
    return getDescriptionByStage(stage,part);
}

function getDescriptionByStage(stage,part){
    if(stage<0)return null;
    var res='';
    if(part === '软件项目委托测试申请书'){
        if(stage>=13)
        return '已完成'
        else if(stage>=8)
        return '等待市场部完成'
    }
    else if(part === '委托测试软件功能列表'){
        if(stage>=1)
        return '已完成'
        else
        return '尚未创建'
    }
    else if(part === '软件委托测试合同'){
        if(stage>=19)
            return '已完成'
        else if(stage<14)
            return '尚未创建'
    }
    else if(part === '软件项目委托测试保密协议'){
        if(stage>=21)
            return '用户已签署保密协议，委托完成'
        else if(stage<20)
            return '尚未创建'
    }
    else if(part === '报价单'){
        if(stage>=12)
            return '已签订'
        else
            return '等待用户回复'
    }
    switch(stage){
        case -1:res='状态错误';break;
        case 0:res='用户已提交申请表，等待用户填写软件功能列表';break;
        case 1:res='用户已提交软件功能列表，等待用户上传软件文档';break;
        case 2:res='用户已上传软件文档，等待用户提交样品';break;
        case 3:res='用户已提交样品，等待测试部审核';break;
        case 4:res='测试部驳回';break;
        case 5:res='测试部审核用户申请通过，等待市场部审核';break;
        case 6:res='市场部不受理用户申请';break;
        case 7:res='市场部对用户申请提出进一步审理';break;
        case 8:res='市场部确认受理用户请求，等待市场部发起议价';break;
        case 9:res='市场部提出议价，等待客户回复';break;
        case 10:res='客户不接受议价，委托终止';break;
        case 11:res='客户提出再议价';break;
        case 12:res='客户已接受议价，等待市场部人员完成测试申请书';break;
        case 13:res='市场部人员已完成申请表，等待市场部人员填写测试合同和履行期限';break;
        case 14:res='等待客户接受履行期限';break;
        case 15:res='客户不接受履行期限，委托终止';break;
        case 16:res='客户针对履行期限申请再议';break;
        case 17:res='客户接受履行期限，等待市场部填写签章受托人部分';break;
        case 18:res='市场部已填写受托人签章，等待客户填写委托人签章';break;
        case 19:res='用户已经填写测试合同，等待市场部下载合同文件后双方线下签字，并由市场部上传已签订合同';break;
        case 20:res='测试部已填写保密协议，等待客户填写保密协议';break;
        case 21:res='已签署保密协议，委托完成';break;
    }
    return res;
}