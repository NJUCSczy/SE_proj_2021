
export function getTestStageByInfo(info){
    if(info===null || info ===undefined)return 0;
    return (
    info.hasOwnProperty('软件测试方案') === false  ? -1: //错误状态
    info.hasOwnProperty('委托测试软件功能列表') === false  ? 0: //testplan.js
    info.hasOwnProperty('软件测试用例') === false ? 2: //testcase.js
    info.hasOwnProperty('软件测试记录') === false ? 3: //testrecord.js
    info.hasOwnProperty('软件测试问题清单') === false ? 4: //questionlist.js
    info.hasOwnProperty('软件文档评审表') === false ? 5: //sofewaredocumentreviewform.js
    info.hasOwnProperty('软件测试报告') === false ? 6: //testreport.js
    info.hasOwnProperty('测试报告检查表') === false ? 7: ///checklist.js
    info['测试报告检查表']['确认意见'] === '不通过' ? 8 : //checklist.js 需要修改
    info.hasOwnProperty('软件项目委托测试工作检查表') === false ? 9://testchecklist.js
    info['软件项目委托测试工作检查表']['市场部受理意见'] === '批准签发' ? 10 : //testchecklist.js 需要修改
    11
    );
}

export function getTestStageByDTAState(state){
    switch(state){
        case 'ERROR':return -1;//错误状态
        case 'TEST_SCHEME':return 0;//项目已生成，等待测试人员填写《软件测试方案》
        case 'AUDIT_QUALITY':return 1;//测试人员已经填写《软件测试方案》，等待质量部人员审核并填写《测试方案评审表》
        case 'AUDIT_QUALITY_DENIED':return 2;//质量部人员审核完成，填写《测试方案评审表》，测试方案未通过，等待测试人员重新填写《软件测试方案》
        case 'TEST_DOC_TEST_CASE':return 3;//质量部人员审核完成，填写《测试方案评审表》，测试方案通过，等待测试人员填写《测试用例》
        case 'TEST_DOC_TEST_RECORD':return 4;//测试人员填写《测试用例》，等待填写《软件测试记录》
        case 'TEST_DOC_BUG_LIST':return 5;//测试人员填写《软件测试记录》，等待填写《软件测试问题清单》
        case ' TEST_DOC_DOC_EVALUATION_TABLE':return 6;//测试人员填写《软件测试问题清单》,等待填写《软件文档评审表》
        case ' TEST_DOC_TEST_REPORT':return 7;//测试人员填写《软件文档评审表》，等待《软件测试报告》的填写
        case 'TEST_DOC_TEST_REPORT_EVALUATION_TABLE':return 8;//测试人员完成《软件测试报告》的填写，等待质量部人员审核
        case 'TEST_REPORT_DENIED':return 9;//质量部人员完成填写《测试报告检查表》，《软件测试报告》未通过，等待测试人员重新填写《软件测试报告》
        case 'TEST_DOC_WORK_EVALUATION_TABLE':return 10;//质量部人员完成填写《测试报告检查表》，《软件测试报告》通过，等待市场部人员填写《软件项目委托测试工作检查表》
        case ' TEST_DOC_WORK_ACCEPTED':return 11;//市场部人员填写《软件项目委托测试工作检查表》，批准签发《软件测试报告》
        case 'TEST_DOC_WORK_DENIED':return 12;//市场部人员填写《软件项目委托测试工作检查表》，未批准《软件测试报告》

        default:return -1;
    }
}

export function getTestStatusInfo(info,part=null){  
    var stage=getTestStageByInfo(info);
    return getTestDescriptionByStage(stage,part);
}

export function getStatusByDelegationState(state,part=null){
    var stage=getTestStageByDTAState(state);
    //console.log(stage,part)
    return getTestDescriptionByStage(stage,part);
}


function getTestDescriptionByStage(stage,part){
    if(stage<0)return null;
    var res='';
    // if(part === '软件项目委托测试申请书'){
    //     if(stage>=13)
    //     return '已完成'
    //     else if(stage>=8)
    //     return '等待市场部完成'
    // }
    // else if(part === '委托测试软件功能列表'){
    //     if(stage>=1)
    //     return '已完成'
    //     else
    //     return '尚未创建'
    // }
    // else if(part === '软件委托测试合同'){
    //     if(stage>=19)
    //         return '已完成'
    //     else if(stage<14)
    //         return '尚未创建'
    // }
    // else if(part === '软件项目委托测试保密协议'){
    //     if(stage>=21)
    //         return '用户已签署保密协议，委托完成'
    //     else if(stage<20)
    //         return '尚未创建'
    // }
    // else if(part === '报价单'){
    //     if(stage>=12)
    //         return '已签订'
    //     else
    //         return '等待用户回复'
    // }
    switch(stage){
        case -1:res='状态错误';break;
        case 0:res='测试人员已经填写《软件测试方案》，等待质量部人员审核并填写《测试方案评审表》';break;
        case 1:res='质量部人员审核完成，填写《测试方案评审表》，测试方案未通过，等待测试人员重新填写《软件测试方案》';break;
        case 2:res='质量部人员审核完成，填写《测试方案评审表》，测试方案通过，等待测试人员填写《测试用例》';break;
        case 3:res='测试人员填写《测试用例》，等待填写《软件测试记录》';break;
        case 4:res='测试人员填写《软件测试记录》，等待填写《问题清单》';break;
        case 5:res='测试人员填写《软件测试问题清单》,等待填写《软件文档评审表》';break;
        case 6:res='测试人员填写《软件文档评审表》，等待《软件测试报告》的填写';break;
        case 7:res='测试人员完成《软件测试报告》的填写，等待质量部人员审核';break;
        case 8:res='质量部人员完成填写《测试报告检查表》，《软件测试报告》未通过，等待测试人员重新填写《软件测试报告》';break;
        case 9:res='质量部人员完成填写《测试报告检查表》，《软件测试报告》通过，等待市场部人员填写《软件项目委托测试工作检查表》';break;
        case 10:res='市场部人员填写《软件项目委托测试工作检查表》，批准签发《软件测试报告》';break;
        case 11:res='市场部人员填写《软件项目委托测试工作检查表》，未批准《软件测试报告》';break;

    }
    return res;
}