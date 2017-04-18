/**
 * This File is gonna serve some helping functions that our App will need.
 * There are only functions within this file so including it won't make any trouble.
 * To use this file you will need to have included at least Openlayers (ol.js) and JQuery
 **/


/**
 * updateMapExtent()
 * Retrieves the current Map Position and saves it into the global variable extent.
 **/
function updateMapExtent() {
    var tmpExtent = map.getView().calculateExtent(map.getSize());
    extent = transformToWorldCoordinates([tmpExtent[0], tmpExtent[1]]).concat(transformToWorldCoordinates([tmpExtent[2], tmpExtent[3]]));
}