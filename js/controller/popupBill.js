// jQuery code
$(document).ready(function () {

});
/**
@author norosa@programmer.net
@description to manage popupBill from popupBill.html
@name popupBill.js
@date march 9 2017
@version 1.1
**/
(function () {
    angular.module('StockManagerApp').controller('PopUpBillController', ['$scope', '$window', '$cookies', '$filter', function ($scope, $window, $cookies, $filter) {
            $scope.productsArray = [];
            $scope.productsArrayAux = [];

            $scope.cookie = new Product();
            $scope.totalPrice = 0;
            $scope.editInput = [];

            //Pagination variables
            $scope.pageSize = 5;
            $scope.currentPage = 1;
            $scope.filteredData;

            //Scope varibles for cookies management
            $scope.generalName = "consum";
            $scope.path = "/";
            $scope.domain;
            $scope.expires;
            $scope.secure;

            // gets all cookies to manage the final form
            this.loadCookies = function () {
                var cookies = $cookies.getAll();
                angular.forEach(cookies, function (value, key) {
                    // Check the cookie is not the global one
                    if (key !== $scope.generalName) {
                        var products = new Product();
                        // As the cookie cames as an string we convert it to object
                        products.cookieToObj(JSON.parse(value));
                        $scope.totalPrice = $scope.totalPrice + products.getPrice();
                        $scope.productsArray.push(products);
                        $scope.editInput.push(false);
                    }
                });

                //this.deleteAllCookies();
            };

            this.loadCookies();



            //deletes all cookies and reloads parent window
            this.deleteAllCookies = function () {
                var nCookies = $cookies.get($scope.generalName, {path: $scope.path});
                var cookies = $cookies.getAll();
                //$cookies.removeAll();
                angular.forEach(cookies, function (v, k) {
                    $cookies.remove(k, {path: $scope.path});
                });
                window.opener.location.reload();
                $window.close();

            };
            // print function for the print button
            this.print = function () {
                $window.print();
            };

        }]);

    angular.module('StockManagerApp').directive("popupBill", function () {
        //app.directive("popupViewForm", function () {
        return {
            restrict: 'E', // type of directive
            templateUrl: "../../view/templates/popup-bill.html",
            controller: function () {
                // When the document is ready execute this code
            },
            controllerAs: 'popupBillCtrl' // This is the alias
        };
    });
})();
