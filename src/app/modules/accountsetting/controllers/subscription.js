define(function(require) {
    'use strict';

    var angular = require('angular');

    ctrlFn.$inject = ['$scope', '$uibModal', 'MemberService', 'toaster', 'ajaxLoadingFactory'];

    function ctrlFn($scope, $uibModal, MemberService, toaster, ajaxLoadingFactory) {
        //Nội dung của controller ghi ở đây
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
            ajaxLoadingFactory.show();
            MemberService.getMember()
                .then(function(resp) {
                    vm.region = resp.region;
                    data = resp;
                    if (data.subscription === "Basic") {
                      document.getElementById("Basic").checked = true;
                        vm.basic = true;
                    } else if (data.subscription === "Premium-monthly") {
                      document.getElementById("Monthly").checked = true;
                        vm.monthly = true;
                    } else if (data.subscription === "Premium-yearly") {
                      document.getElementById("Yearly").checked = true;
                        vm.yearly = true;
                    }
                    toaster.pop('success', 'Note', 'Get member success!');
                    //console.log("get member success");
                })
                .catch(function(error) {
                    toaster.pop('error', 'Note', 'Get member error!');
                    //  console.log("get member error", error);
                })
                .finally(function() {
                    ajaxLoadingFactory.hide();
                });
        }

        vm.ok = function() {
          ajaxLoadingFactory.show();
            try {
                change(data);
                MemberService.saveData(data);
                toaster.pop('success', 'Note', 'Change member success!');
                //console.log("Change member success");
            } catch (e) {
                toaster.pop('error', 'Note', 'Change member error!');
                //console.log("Change member error");
            } finally {
                ajaxLoadingFactory.hide();
            };
        }

        init();

    }
    return ctrlFn;
});
