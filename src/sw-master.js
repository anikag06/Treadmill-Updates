importScripts('./ngsw-worker.js');


function testing() {
   console.log("test")
   console.log(sessionStorage.setItem("jwt_token", "test"));
}

testing();