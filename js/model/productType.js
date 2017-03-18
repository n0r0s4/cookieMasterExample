function ProductType(){
  this.id;
  this.name;

  //contructor
  this.construct=function(id, name){
    this.id=id;
    this.name=name;
  };

  //Getter and setter
  this.getId=function(){return this.id;};
  this.setId=function(id){this.id=id;};

  this.getName=function(){return this.name;};
  this.setName=function(name){this.name=name;};

}
