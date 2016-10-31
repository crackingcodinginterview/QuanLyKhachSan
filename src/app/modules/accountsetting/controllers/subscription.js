define(function(require) {
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', '$uibModal', 'MemberService'];

    function ctrlFn($scope, $uibModal, MemberService) {
        //Nội dung của controller ghi ở đây
        console.log('đang ở subsription');
        var vm = this;
        var data;
        vm.region = "";
        vm.basic = false;
        vm.monthly = false;
        vm.yearly = false;
        vm.option = "NA"

        function change(data) {
            if (vm.region != "") {
                data.region = vm.region;
            }
            if (vm.basic === true) {
                data.subscription = "Basic"
            }
            if (vm.monthly === true) {
                data.subscription = "Premium-monthly"
            }
            if (vm.yearly === true) {
                data.subscription = "Premium-yearly"
            }
        }

        vm.basicFuntion = function() {
            vm.basic = true;
            vm.monthly = false;
            vm.yearly = false;
        }

        vm.monthlyFuntion = function() {
            vm.basic = false;
            vm.monthly = true;
            vm.yearly = false;
        }

        vm.yearlyFuntion = function() {
            vm.basic = false;
            vm.monthly = false;
            vm.yearly = true;
        }

        function init() {
            MemberService.getMember()
                .then(function(resp) {
                    vm.region = resp.region;
                    data = resp;
                    if(data.subscription == "basic"){
                      vm.basic = true;
                    }
                    else if(data.subscription == "monthly"){
                      vm.monthly = true;
                    }
                    else if (data.subscription == "yearly") {
                      vm.yearly = true;
                    }
                    console.log("get member success");
                })
                .catch(function(error) {
                    console.log("get member error", error);
                });;
        }

        vm.ok = function() {
            try {
                change(data);
                MemberService.saveData(data);
                console.log("Change member success");
            } catch (e) {
                console.log("Change member error");
            }
        }

        init();

    }
    return ctrlFn;
});
