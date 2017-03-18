// jQuery code
$(document).ready(function () {

});
/**
@author norosa@programmer.net
@description to manage popupresult from popupresultview.html
@name popup.js
@date march 9 2017
@version 1.3
**/
(function () {
    angular.module('StockManagerApp').controller('PopUpController', ['$scope', '$window', '$cookies', '$filter', function ($scope, $window, $cookies, $filter) {
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

            // Loads the cookies into objects
            this.loadCookies = function () {
                $scope.productsArray = [];
                $scope.totalPrice = 0;
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
            };

            //removes the cookie seeking by product id, helped by removeProduct
            this.deleteCookies = function (index) {
                var nCookies = $cookies.get($scope.generalName, {path: $scope.path});
                $cookies.put($scope.generalName, parseInt(nCookies) - 1, {path: $scope.path});
                this.removeProduct(index);
                console.log(index);
                console.log("nCookies" + nCookies);
                console.log("$scope.generalName" + $scope.generalName);
                this.loadCookies();
            };

            //function to help deletecookies, where really the cookie is removed
            this.removeProduct = function(removeId){
              var obraMaestraSublime = false;//no break on angular foreach, this flag will break it :)
              var cookies = $cookies.getAll();
              angular.forEach(cookies, function (value, key) {
                if(!obraMaestraSublime){
                  if (key !== $scope.generalName) {  // Check the cookie is not the global one
                      var products = new Product();
                      // As the cookie cames as an string we convert it to object
                      products.cookieToObj(JSON.parse(value));
                      if (products.getId()==removeId) {
                        $cookies.remove(key, {path: $scope.path});
                        obraMaestraSublime=true;//only removes 1 of n items if user has same item n times
                      }
                  }
                }
              });
            }

            //to remove all cookies, unused here
            this.deleteAllCookies = function () {
                if (confirm("Do you want go to finish and pay?")) {
                    var cookies = $cookies.getAll();
                    angular.forEach(cookies, function (v, k) {
                        $cookies.remove(k, {path: $scope.path});
                    });
                    $scope.cookiesCounter = 0;
                    $scope.totalToPay = 0;
                }
            };

            //to modify cookies, unused here
            this.modifyCookie = function (index) {
                if ($scope.editInput[index]) {
                    $scope.editInput[index] = false;
                    // modify the cookie
                    $cookies.putObject($scope.generalName + index,
                            $scope.productsArray[index], {path: $scope.path});
                } else {
                    $scope.editInput[index] = true;
                }
            };

            // Controller properties
            this.products; // Product data to show
            // Get an Array with dimension num
            $scope.getNumber = function (num) {
                var a = [];
                for (var i = 0; i < num; i++)
                    a.push(i);
                return a;
            };

            //maybe-other-time function, unused here and supplied by cookies
            this.initialize = function () {
                // Pass variables between controllers
                // Load data from the window opener using angular object and DOM
                this.products = $window.opener.angular.element('#stockmanager-ctrl').scope().StockManagerCtrl.products;
            };

            // print function for the print button
            this.print = function () {
                $window.print();
            };

            //this.initialize();
            this.loadCookies();
        }]);

    angular.module('StockManagerApp').directive("popupResultView", function () {
        //app.directive("popupViewForm", function () {
        return {
            restrict: 'E', // type of directive
            templateUrl: "../../view/templates/popup-result-view.html",
            controller: function () {
                // When the document is ready execute this code
            },
            controllerAs: 'popupViewCtrl' // This is the alias
        };
    });
})();
