// ----------------- Challenge handler start -----------------
var challengeHandler1 = WL.Client.createChallengeHandler("FTRealm");
challengeHandler1.isCustomResponse = function(response){
	if (!response || !response.responseJSON	|| response.responseText === null) {
		return false;
	}
	if (typeof(response.responseJSON.authRequired) !== 'undefined'){
		return true;
	} else {
		return false;
	}
};

challengeHandler1.handleChallenge = function(response){
	
	if(response){
		var authRequired = response.responseJSON.authRequired;
		
		if (authRequired === true){
			if (response.responseJSON.errorMessage)
		    	alert(response.responseJSON.errorMessage);
			
		}else if (authRequired === false){
			$.mobile.changePage( "home.html", { transition: "slideup"} );
		}
	}
};
// ----------------- Challenge handler end -----------------

window.busy = new WL.BusyIndicator('content', { duration: 1 });

function openCacheFailure(status) {
	WL.Logger.debug('Open Encrypted Cache failed: ' + status);
	busy.hide();
}
function writeEncCache(key, value, onSuccess) {
	busy.show();
	WL.EncryptedCache.open('ENCRYPT_KEY', true, function(status) {
		WL.EncryptedCache.write(key, value, function() {
			if($.isFunction(onSuccess)) {
				onSuccess();
			}
			WL.EncryptedCache.close();
			busy.hide();
		}, function(status) {
			alert("Write Encrypted Cache failed. error code= " + status);
		});
	}, openCacheFailure);
}
function readEncCache(key, onSuccess) {
	busy.show();
	WL.EncryptedCache.open('ENCRYPT_KEY', true, function(status) {
		// if in offline mode, check username and password from Encrypted Cache
		WL.EncryptedCache.read(key, function(value) {
			if($.isFunction(onSuccess)) {
				onSuccess(value);
			}
			WL.EncryptedCache.close();
			busy.hide();
		}, function(status) {
			alert("Read Encrypted Cache failed. error code= " + status);
		});
	}, openCacheFailure);
}

window.doLogin = function() {

	username = $("#smsusername").val();
	password = $("#smspassword").val();
	if(!username || !password) {
		alert("Username and password cannot be empty!");
        return;
	}
	WL.Client.logout('FTRealm',{onSuccess: WL.Client.reloadApp});
	
	var invocationData = {
			adapter : "LoginAdapter",
			procedure : "login",
			parameters : [ username, password ]
		};
	var response = challengeHandler1.submitAdapterAuthentication(invocationData);
	challengeHandler1.handleChallenge(response);
		
};



$("#loginbtn").bind('click', doLogin);
var Authenticator = function () {
	return {
		init : function() {
		},

		isLoginFormResponse : function(response) {
			if (!response || !response.responseJSON	|| response.responseText === null) {
				return false;
			}
			return response.responseJSON.authRequired;
		},

		onBeforeLogin : function(response, username, onSubmit, onCancel) {
			if (response.responseJSON && response.responseJSON.errorMessage) {
				alert(response.responseJSON.errorMessage);
			}
		},

		onShowLogin : function() {
		},

		onHideLogin : function() {
		}
	};
}();
