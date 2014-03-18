// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
var viewModel = function() {
    var self = this;
    this.searchText = ko.observable("").extend({
        minLength: 3
    });
    this.searchPH = ko.observable("Choose a location type");
    this.weatherText = ko.observable();
    this.geoType = ko.observable();
    this.geoTypes = ko.observableArray([
        { name: "City", value: 1 },
        { name: "Zip code", value: 2 }
    ]);
    this.geoType.subscribe(function(newVal){
        if (newVal) {
            self.searchText("");
            self.searchPH(newVal.name);
        }
        else{
            self.searchPH();
        }
    });

    // Get the weather
    self.clearText = function clearText () {
        self.searchText("");
        self.weatherText("");
    }

    // Get the weather
    self.makeRequest = function makeRequest () {

        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: "http://api.openweathermap.org/data/2.1/find/name?q=" + this.searchText() + "&type=likeunits=imperial",
            success: function(resp){
                console.log(resp);
                self.weatherText(resp.list[0].weather[0].description);

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Status: " + textStatus); 
                console.log("Error: " + errorThrown); 
            }
        }); 
    }
}
            //

// Activates knockout.js
$(document).ready(function() {
    ko.applyBindings(new viewModel());
});