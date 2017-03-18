function Product(){
  this.id;
  this.name;
  this.productType;
  this.price;
  this.inOffer;
  this.entryDate;

  //contructor
  this.construct=function(id, name, productType, price, inOffer, entryDate){
    this.id=id;
    this.name=name;
    this.productType=productType;
    this.price=price;
    this.inOffer=inOffer;
    this.entryDate=entryDate;
  };

  //Getter and setter
  this.getId=function(){return this.id;};
  this.setId=function(id){this.id=id;};

  this.getName=function(){return this.name;};
  this.setName=function(name){this.name=name;};
  
  this.getProductType=function(){return this.productType;};
  this.setProductType=function(productType){this.productType=productType;};

  this.getPrice=function(){return this.price;};
  this.setPrice=function(price){this.price=price;};

  this.getInOffer=function(){return this.inOffer;};
  this.setInOffer=function(inOffer){this.inOffer=inOffer;};

  this.getEntryDate=function(){return this.entryDate;};
  this.setEntryDate=function(entryDate){this.entryDate=entryDate;};
  
  this.arrayToString = function (arrayCookieObj) {
        var cookieString = "";
        $.each(arrayCookieObj, function (index, film) {
            cookieString += "film number " + (index + 1) + ":" + film.toString() + "\n";
        });
        return cookieString;
    };

    this.toCookie = function () {
        //var cookieString = "id=" + this.getId() + ":name=" + this.getName() + ":productType.id=" + this.productType.getId();
        //cookieString += ":productType.name=" + this.productType.getName() + ":price=" + this.getPrice()+ ":inOffer=" + this.getInOffer()+ ":entryDate=" + this.getEntryDate();
        var cookieString = "id=" + this.getId() + ":name=" + this.getName() + ":productType=" + this.getProductType();
        cookieString += ":price=" + this.getPrice()+ ":inOffer=" + this.getInOffer()+ ":entryDate=" + this.getEntryDate();
        return cookieString;
    };

    this.toString = function () {
        //var cookieString = "id=" + this.getId() + ":name=" + this.getName() + ":productType.id=" + this.productType.getId();
        //cookieString += ":productType.name=" + this.productType.getName() + ":price=" + this.getPrice()+ ":inOffer=" + this.getInOffer()+ ":entryDate=" + this.getEntryDate();
        var cookieString = "id=" + this.getId() + ":name=" + this.getName() + ":productType=" + this.getProductType();
        cookieString += ":price=" + this.getPrice()+ ":inOffer=" + this.getInOffer()+ ":entryDate=" + this.getEntryDate();
        
        return cookieString;
    };
    /*
     this.cookieToObj = function (cookieString)
     {
     var filedsArray = cookieString.split(":");
     this.construct (filedsArray[0].split("=")[1],filedsArray[1].split("=")[1],filedsArray[2].split("=")[1],filedsArray[3].split("=")[1],filedsArray[4].split("=")[1],filedsArray[5].split("=")[1],filedsArray[6].split("=")[1]);
     }*/


    this.cookieToObj = function (product) {
        try {
            this.setId(product.id);
        } catch (err) {

        }

        try {
            this.setName(product.name);
        } catch (err) {

        }

        try {
            this.productType.setId(product.productType.id);
        } catch (err) {

        }

        try {
            this.productType.setName(product.productType.name);
        } catch (err) {

        }

        try {
            this.setPrice(product.price);
        } catch (err) {

        }

        try {
            this.setInOffer(product.inOffer);
        } catch (err) {

        }

        try {
            this.setEntryDate(product.entryDate);
        } catch (err) {
            // TODO
        }
    };
  
}
