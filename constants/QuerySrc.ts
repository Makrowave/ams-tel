export enum QuerySrc {
  Places = "Places/",
  Excluded = "Status/Excluded",
  Models = "Models",
  Colors = "Colors",
  Wheels = "WheelSizes",
  Manufacturers = "Manufacturers",
  Categories = "Categories",
  BikesByModel = "BikesByModelId",
}

export enum ModelsQuery {
  avaible = "?placeId=0&avaible=true&manufacturerId=&wheelSize=&frameSize=&name=&electric=false&statusId=&isWoman=&isKids=false&minPrice=0&maxPrice=100000&colorId=&categoryId=",
  all = "?placeId=0&avaible=false&manufacturerId=&wheelSize=&frameSize=&name=&electric=false&statusId=&isWoman=&isKids=false&minPrice=0&maxPrice=100000&colorId=&categoryId=",
}
