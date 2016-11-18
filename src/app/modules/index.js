define(function(require){
    'use strict';

    return {
        base1: require('./base1/base1'),
        base2: require('./base2/base2'),
        base3: require('./base3/base3'),
        home: require('./home/home'),
        login: require('./login/login'),
        forgotpassword: require('./forgotpassword/forgotpassword'),
        register: require('./register/register'),
        booking: require('./booking/booking'),
        accounting: require('./accounting/accounting'),
        accountsetting: require('./accountsetting/accountsetting'),
        property: require('./property/property'),
        room: require('./room/room'),
        external: require('./external/external'),
        confirmpassword: require('./confirmpassword/confirmpassword'),
    };
});