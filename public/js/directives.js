angular.module('dashboardApp')
.directive('ngConfirmClick', [
        function(){
            console.log("directive");
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
//# sourceMappingURL=directives.js.map