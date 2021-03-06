export function getTestStageByInfo(info){
    if(info===null || info ===undefined)return 0;
    return (
        info.hasOwnProperty('用户申请表') === false  ? -1: //-1 错误状态
        info.hasOwnProperty('软件测试方案') === false  ? 0: //0 项目已成立，等待测试人员填写《软件测试方案》
        info.hasOwnProperty('测试方案评审表') === false  ? 1: //1 测试人员已经填写《软件测试方案》，等待质量部人员审核并填写《测试方案评审表》
        info['测试方案评审表']['确认意见'] === '不通过'  ? 2: //2 质量部人员审核完成，填写《测试方案评审表》，测试方案未通过，等待测试人员重新填写《软件测试方案》
        info.hasOwnProperty('测试用例电子记录') === false ? 3: //3 质量部人员审核完成，填写《测试方案评审表》，测试方案通过，等待测试人员填写《测试用例》
        info.hasOwnProperty('软件测试记录电子记录') === false ? 4: //4 测试人员填写《测试用例》，等待填写《软件测试记录》
        info.hasOwnProperty('软件测试问题清单') === false ? 5: //5 测试人员填写《软件测试记录》，等待填写《软件测试问题清单》
        info.hasOwnProperty('软件文档评审表') === false ? 6: //6 测试人员填写《软件测试问题清单》,等待填写《软件文档评审表》
        info.hasOwnProperty('软件测试报告') === false ? 7: //7 测试人员填写《软件文档评审表》，等待《软件测试报告》的填写
        info.hasOwnProperty('测试报告检查表') === false ? 8: //8 测试人员完成《软件测试报告》的填写，等待质量部人员审核并填写《测试报告检查表》
        info['测试报告检查表']['确认意见'] === '不通过' ? 9: //9 质量部人员完成填写《测试报告检查表》，《软件测试报告》未通过，等待测试人员重新填写《软件测试报告》
        info.hasOwnProperty('软件项目委托测试工作检查表') === false ? 10: //10 质量部人员完成填写《测试报告检查表》，《软件测试报告》通过，等待市场部人员填写《软件项目委托测试工作检查表》
        info['软件项目委托测试工作检查表']['市场部审核意见'] === '批准签发' ? 11: //11 市场部人员填写《软件项目委托测试工作检查表》，批准签发《软件测试报告》
        12 //12 市场部人员填写《软件项目委托测试工作检查表》，未批准《软件测试报告》
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
        case 'TEST_DOC_DOC_EVALUATION_TABLE':return 6;//测试人员填写《软件测试问题清单》,等待填写《软件文档评审表》
        case 'TEST_DOC_TEST_REPORT':return 7;//测试人员填写《软件文档评审表》，等待《软件测试报告》的填写
        case 'TEST_DOC_TEST_REPORT_EVALUATION_TABLE':return 8;//测试人员完成《软件测试报告》的填写，等待质量部人员审核并填写《测试报告检查表》
        case 'TEST_REPORT_DENIED':return 9;//质量部人员完成填写《测试报告检查表》，《软件测试报告》未通过，等待测试人员重新填写《软件测试报告》
        case 'TEST_DOC_WORK_EVALUATION_TABLE':return 10;//质量部人员完成填写《测试报告检查表》，《软件测试报告》通过，等待市场部人员填写《软件项目委托测试工作检查表》
        case 'TEST_DOC_WORK_ACCEPTED':return 11;//市场部人员填写《软件项目委托测试工作检查表》，批准签发《软件测试报告》
        case 'TEST_DOC_WORK_DENIED':return 12;//市场部人员填写《软件项目委托测试工作检查表》，未批准《软件测试报告》

        default:return -1;
    }
}

export function getTestStatusInfo(info,part=null){  
    var stage=getTestStageByInfo(info);
    return getTestDescriptionByStage(stage,part);
}

export function getTestStatusByDelegationState(state,part=null){
    var stage=getTestStageByDTAState(state);
    //console.log(stage,part)
    return getTestDescriptionByStage(stage,part);
}


function getTestDescriptionByStage(stage,part){
    if(stage<0)return null;
    var res='';
     if(part === '软件测试方案'){
        if(stage>=3)
            return '已完成,质量部审核通过'
        else if(stage===2)
            return '质量部审核未通过,等待重写'
        else if(stage>=1)
            return '已完成'
        else if(stage===0)
            return '尚未完成'
    }
    else if(part === '测试方案评审表'){
        if(stage>=2)
            return '已完成'
        else 
            return '尚未完成'
    }
    else if(part === '测试用例'){
        if(stage>=4)
            return '已完成'
        else 
            return '尚未完成'
    }
    else if(part === '软件测试记录'){
        if(stage>=5)
            return '已完成'
        else 
            return '尚未完成'
    }
    else if(part === '软件测试问题清单'){
        if(stage>=6)
            return '已完成'
        else 
            return '尚未完成'
    }
    else if(part === '软件文档评审表'){
        if(stage>=7)
            return '已完成'
        else 
            return '尚未完成'
    }
    else if(part === '软件测试报告'){
        if(stage===11)
            return '已完成,市场部批准签发'
        else if(stage>=12)
            return '已完成,市场部不批准签发'
        else if(stage>=10)
            return '已完成,质量部审核通过,等待市场部批准签发'
        else if(stage>=8)
            return '已完成,等待质量部审核'
        else if(stage===9)
            return '已完成,等待质量部审核'
        else
            return '未完成'
    }
    else if(part === '测试报告检查表'){
        if(stage>=9)
            return '已完成'
        else
            return '未完成'
    }
    else if(part === '软件项目委托测试工作检查表'){
        if(stage>=11)
            return '已完成'
        else
            return '未完成'
    }
    switch(stage){
        case -1:res='状态错误';break;
        case 0:res='项目已生成，等待测试人员填写《软件测试方案》';break;
        case 1:res='测试人员已经填写《软件测试方案》，等待质量部人员审核并填写《测试方案评审表》';break;
        case 2:res='质量部人员审核完成，填写《测试方案评审表》，测试方案未通过，等待测试人员重新填写《软件测试方案》';break;
        case 3:res='质量部人员审核完成，填写《测试方案评审表》，测试方案通过，等待测试人员填写《测试用例》';break;
        case 4:res='测试人员填写《测试用例》，等待填写《软件测试记录》';break;
        case 5:res='测试人员填写《软件测试记录》，等待填写《问题清单》';break;
        case 6:res='测试人员填写《软件测试问题清单》,等待填写《软件文档评审表》';break;
        case 7:res='测试人员填写《软件文档评审表》，等待《软件测试报告》的填写';break;
        case 8:res='测试人员完成《软件测试报告》的填写，等待质量部人员审核';break;
        case 9:res='质量部人员完成填写《测试报告检查表》，《软件测试报告》未通过，等待测试人员重新填写《软件测试报告》';break;
        case 10:res='质量部人员完成填写《测试报告检查表》，《软件测试报告》通过，等待市场部人员填写《软件项目委托测试工作检查表》';break;
        case 11:res='市场部人员填写《软件项目委托测试工作检查表》，批准签发《软件测试报告》';break;
        case 12:res='市场部人员填写《软件项目委托测试工作检查表》，未批准《软件测试报告》';break;

    }
    return res;
}