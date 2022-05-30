module.exports = {
    sections: [
        {
            name: '用户操作部分',
            sections:[
                {
                    name:"委托部分",
                    components: 'src/UserActions/actions/DelegationPart/**/*.js',
                    contents:'src/UserActions/actions/DelegationPart/**/*.md',
                },
                {
                    name:"合同部分",
                    components: 'src/UserActions/actions/ContractPart/**/*.js',
                },
                {
                    name:"测试部分",
                    components: 'src/UserActions/actions/TestPart/**/*.js',
                },
                {
                    name:"回显部分",
                    components: 'src/UserActions/actions/ViewPart/**/*.js',
                }
            ]
            
        },
        {
            name: '用户信息部分',
            components: 'src/register_login/**/*.js',
        }
    ],
    
};