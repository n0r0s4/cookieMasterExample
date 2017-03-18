// jQuery code
$(document).ready(function () {

});

/**
@author norosa@programmer.net
@description main js to manage index.html
@name index.js
@date march 9 2017
@version 1.3
**/
// angularjs code
(function () {
  angular.module('StockManagerApp').controller('StockManagerController', ['$scope', '$window', '$cookies', function ($scope, $window, $cookies) {

    // properties
    this.productTypes; // Type of products in the system
    this.productType; // Selected value in the select
    this.nProducts; // Number of products to add
    this.products; // Product data to add
    $scope.cookiesCounter = 0;
    // Scope variables
    // action: {"init", "add-products"}
    $scope.catalog = [];
    $scope.catalogShow = [];
    $scope.searchByType = "";
    $scope.action = "init";
    $scope.generalName = "consum";
    $scope.path = "/";
    $scope.totalToPay = 0;

//to start application in index.html
    this.initialize = function () {
      // Initialize productTypes
      this.productTypes = [];
      var productTypeNames = ["Office", "Bookcase"];

      // Create the objects and push into this.productTypes
      for (var i = 0; i < productTypeNames.length; i++) {
        var productType = new ProductType();
        productType.construct(i, productTypeNames[i]);
        this.productTypes.push(productType);
      }

      $scope.product1 = new Product();
      $scope.product1.construct(
        0,
        "Markus",
        this.productTypes[0],
        300.50,
        false,
        new Date());
        $scope.catalog.push($scope.product1);

        $scope.product2 = new Product();
        $scope.product2.construct(
          1,
          "Kullaberg",
          this.productTypes[0],
          49.99,
          false,
          new Date());
          $scope.catalog.push($scope.product2);

          $scope.product3 = new Product();
          $scope.product3.construct(
            2,
            "Feodor",
            this.productTypes[0],
            149.00,
            false,
            new Date());
            $scope.catalog.push($scope.product3);

          $scope.product4 = new Product();
          $scope.product4.construct(
            3,
            "Skruvsta",
            this.productTypes[0],
            139.00,
            false,
            new Date());
            $scope.catalog.push($scope.product4);

          $scope.product5 = new Product();
          $scope.product5.construct(
            4,
            "Orfjall",
            this.productTypes[0],
            19.99,
            false,
            new Date());
            $scope.catalog.push($scope.product5);

          $scope.product6 = new Product();
          $scope.product6.construct(
            5,
            "Jules",
            this.productTypes[0],
            69.99,
            false,
            new Date());
            $scope.catalog.push($scope.product6);
            $scope.cookiesCounter = $cookies.get($scope.generalName, {path: $scope.path});
            //!IMPORTANT gets and sets themaster-cookies
          if (isNaN($scope.cookiesCounter)){
              $scope.cookiesCounter = 0;
              $cookies.put($scope.generalName, 0, { path : $scope.path });
              }
          else{
              this.loadCookies();
              }
          this.search();
            console.log($scope.cookiesCounter);
              };


                this.initializeAddProductsForm = function () {
                  this.products = [];
                  // We construct the product objects with the selected parameters and the default values
                  for (var i = 0; i < this.nProducts; i++) {
                    var productObj = new Product();
                    // id, idProductType, name, director, price, available
                    productObj.construct("",
                    this.productType,
                    "",
                    false,
                    new Date());
                    this.products.push(productObj);
                  }
                };

                //gets cookies and creates objects
                this.loadCookies = function () {
                  var cont=0;
                  $scope.totalToPay = 0;
                  var cookies = $cookies.getAll();
                  angular.forEach(cookies, function (value, key) {
                    // Check the cookie is not the global one
                    if (key !== $scope.generalName) {
                      var products = new Product();
                      // As the cookie cames as an string we convert it to object
                      products.cookieToObj(JSON.parse(value));
                      $scope.totalToPay += products.getPrice();
                      cont++;
                    }
                  });
                  return cont;
                }

                // search filter
                this.search = function () {
                  $scope.catalogShow = [];
                  for (var i = 0; i < $scope.catalog.length; i++) {
                    console.log($scope.searchByType.name);
                    if ($scope.searchByType === "" || $scope.catalog[i].productType.name === $scope.searchByType.name) {
                      $scope.catalogShow.push($scope.catalog[i]);
                    }
                  }
                };

                //to create cookies when users selects a product
                this.createCookie = function (index) {
                  // Get the number of cookies untill now
                  var nCookies = $cookies.get($scope.generalName, {path: $scope.path});
                  // If this is the first cookie just initialize to 0
                  // We save the object with the generalName plus the number of cookies until now
                  //var numCookies = this.loadCookies();
                  //alert(numCookies);
                  var randomCookie = Math.floor((Math.random() * 10000000000) + 1);
                  //he decidido generar un número random porke si vas generando id a las cookies en función a la cookie madre, se solapan las hijas al borrar y añadir y dan errores
                  nCookies=parseInt(nCookies) + 1;
                  $cookies.putObject($scope.generalName + randomCookie, $scope.catalogShow[index], {path: $scope.path});
                  // We save each product
                  console.log("test");
                  console.log(index);
                  console.log(nCookies);
                  $cookies.put($scope.generalName, nCookies, {path: $scope.path});
                  $scope.cookiesCounter = parseInt($scope.cookiesCounter) + 1;
                  $scope.totalToPay = $scope.totalToPay + $scope.catalogShow[index].getPrice();
                  console.log($cookies);
                  console.log($scope.generalName);
                  console.log(nCookies);
                };

                //unused function here!
                this.deleteAllCookies = function () {
                  var nCookies = $cookies.get($scope.generalName, {path: $scope.path});
                  var cookies = $cookies.getAll();
                  angular.forEach(cookies, function (v, k) {
                    $cookies.remove(
                      k,
                      {path: $scope.path});
                    });
                    $scope.cookiesCounter = 0;
                    $scope.totalToPay = 0;
                  };

                  //validates if application is ready to manaage products and opens popup with controller
                  this.popupResult = function () {
                    //var nCookies = $cookies.getAll();
                    var nCookies = $cookies.get(
                      $scope.generalName,
                      {path: $scope.path});
                      // If this is the first cookie just initialize to 0
                      if (!isNaN(nCookies) && nCookies>0) {
                        var popupWindow = window.open('view/popup/popup.html');
                      } else {
                        alert("Shopping cart is empty.");
                      }
                    };

                    //validates if application is ready to go to bill state, and opens bill template
                    this.popupBill = function () {
                      //var nCookies = $cookies.getAll();
                      var nCookies = $cookies.get($scope.generalName, {path: $scope.path});
                      // If this is the first cookie just initialize to 0
                      if (!isNaN(nCookies) && nCookies>0) {
                        if (confirm("Are you sure that you want to finish and pay?")) {
                          var popupWindow = window.open('view/popup/popupBill.html');
                          $scope.cookiesCounter = 0;
                          $scope.totalToPay = 0;
                        }
                      } else {
                        alert("Shopping cart is empty.");
                      }
                    };
                    this.initialize();

                  }]); // END Controller

                  // template
                  angular.module('StockManagerApp').directive("productsView", function () {
                    return {
                      restrict: 'E', // type of directive
                      templateUrl: "view/templates/products-view.html",
                      controller: function () {
                        // When the document is ready execute this code
                      },
                      controllerAs: 'productsViewCtrl' // This is the alias
                    };
                  });

                })();
