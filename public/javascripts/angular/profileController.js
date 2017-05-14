var app = angular.module('profileApp', []);
app.controller('profileController',function($scope,$http,$window) {
	console.log("Inside profileController");
	$scope.show_personal_form = false;
    $scope.edit_personal_form = function() {
        console.log("Inside edit_personal_form");
        $scope.show_personal_form=true;
    };
    $scope.save_personal_form = function() {
        console.log("Inside save_personal_form");
        $scope.show_personal_form = false;
        $scope.saveToDB();
    };
    $scope.cancel_personal_form = function() {
        console.log("Inside cancel_personal_form");
        $scope.show_personal_form = false;
        $scope.cancel();
    };
    $scope.show_flight_form = false;
    $scope.edit_flight_form = function() {
        console.log("Inside edit_flight_form");
        $scope.show_flight_form=true;
    };
    $scope.save_flight_form = function() {
        console.log("Inside save_flight_form");
        $scope.show_flight_form = false;
        $scope.saveToDB();
    };
    $scope.cancel_flight_form = function() {
        console.log("Inside cancel_flight_form");
        $scope.show_flight_form = false;
        $scope.cancel();
    };
    $scope.show_car_form = false;
    $scope.edit_car_form = function() {
        console.log("Inside edit_car_form");
        $scope.show_car_form=true;
    };
    $scope.save_car_form = function() {
        console.log("Inside save_car_form");
        $scope.show_car_form = false;
        $scope.saveToDB();
    };
    $scope.cancel_car_form = function() {
        console.log("Inside cancel_car_form");
        $scope.show_car_form = false;
        $scope.cancel();
    };
    $scope.show_hotel_form = false;
    $scope.edit_hotel_form = function() {
        console.log("Inside edit_hotel_form");
        $scope.show_hotel_form=true;
    };
    $scope.save_hotel_form = function() {
        console.log("Inside save_hotel_form");
        $scope.show_hotel_form = false;
        $scope.saveToDB();
    };
    $scope.cancel_hotel_form = function() {
        console.log("Inside cancel_hotel_form");
        $scope.show_hotel_form = false;
        $scope.cancel();
    };
    $scope.show_card_form = false;
	$scope.edit_card_form = function() {
		console.log("Inside edit_card_form");
		$scope.show_card_form=true;
	};
	$scope.save_card_form = function() {
		console.log("Inside save_card_form");
		$scope.show_card_form = false;
        $scope.saveToDB();
	};
    $scope.cancel_card_form = function() {
        console.log("Inside cancel_card_form");
        $scope.show_card_form = false;
        $scope.cancel();
    };
	$scope.init = function() {
		console.log("Inside init");
		$scope.fetchUserDetails();
	};
	$scope.fetchUserDetails = function() {
		console.log("Inside fetchUserDetails");
		$http({
	        method : "GET",
	        url : "/profile/getUserDetails"
	    }).success(function(data){
    		if(data.statusCode == 200){
	    		console.log("after success in fetchUserDetails ");
	    		$scope.first_name = data.results.first_name;
                $scope.last_name = data.results.last_name;
    			$scope.gender = data.results.gender;
                $scope.email = data.results.email;
                $scope.mobile = data.results.contact_information.mobile;
                $scope.dob = data.results.dob;
                $scope.address_line_1 = data.results.contact_information.address.address_line_1;
                $scope.address_line_2 = data.results.contact_information.address.address_line_2;
                $scope.city = data.results.contact_information.address.city;
                $scope.region = data.results.contact_information.address.region;
                $scope.country = data.results.contact_information.address.country;
                $scope.postal_code = data.results.contact_information.address.postal_code;
                $scope.airline_name = data.results.preferences.flight.airline_name;
                $scope.airline_class = data.results.preferences.flight.airline_class;
                $scope.airline_days = data.results.preferences.flight.airline_days.days;
                $scope.airline_time = data.results.preferences.flight.airline_time;
                $scope.car_model = data.results.preferences.car.car_model;
                $scope.car_rental_company = data.results.preferences.car.car_rental_company;
                $scope.car_mileage = data.results.preferences.car.car_mileage;
                $scope.car_price = data.results.preferences.car.car_price;
                $scope.car_features = data.results.preferences.car.car_features.features;
                $scope.hotel_star_rating = data.results.preferences.hotel.hotel_star_rating;
                $scope.hotel_location = data.results.preferences.hotel.hotel_location;
                $scope.hotel_price = data.results.preferences.hotel.hotel_price;
                $scope.food_type = data.results.preferences.food_type;
                $scope.food_cuisine = data.results.preferences.food_cuisine;
                $scope.card_holder_name = data.card_holder_name;
                $scope.card_number = data.card_number;
                $scope.expiry_month = data.expiry_month;
                $scope.expiry_year = data.expiry_year;
                $scope.cvv = data.cvv;
    		}
	    });
	};
	$scope.cancel = function(){
        $window.location.reload();
	}
    $scope.saveToDB = function(){
        $http({
            method : "POST",
            data :{
                "first_name": $scope.first_name,
                "last_name": $scope.last_name,
                "gender": $scope.gender,
                "email": $scope.email,
                "mobile": $scope.mobile,
                "dob": $scope.dob,
                "address_line_1": $scope.address_line_1,
                "address_line_2": $scope.address_line_2,
                "city": $scope.city,
                "region": $scope.region,
                "country": $scope.country,
                "postal_code": $scope.postal_code,
                "airline_name" : $scope.airline_name,
                "airline_class" : $scope.airline_class,
                "airline_days" : $scope.airline_days,
                "airline_time" : $scope.airline_time,
                "car_model": $scope.car_model,
                "car_rental_company": $scope.car_rental_company,
                "car_mileage": $scope.car_mileage,
                "car_price": $scope.car_price,
                "car_features" : $scope.car_features,
                "hotel_star_rating" : $scope.hotel_star_rating,
                "hotel_location" : $scope.hotel_location,
                "hotel_price": $scope.hotel_price,
                "food_type": $scope.food_type,
                "food_cuisine": $scope.food_cuisine,
                "card_holder_name": $scope.card_holder_name,
                "card_number" : $scope.card_number,
                "expiry_month" : $scope.expiry_month,
                "expiry_year" : $scope.expiry_year,
                "cvv" : $scope.cvv
            },
            url : '/profile/updateUserDetails'
        }).success(function (data) {
            console.log("Inside success of updateUserDetails controller");
            if (data.statusCode != 200) {
                //window.location.assign("/signUp");
                console.log("Failed to update");
            } else {
                console.log("Successfully updated");
            }
        });
    };
});