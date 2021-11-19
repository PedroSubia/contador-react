if("serviceWorker" in navigator){
    console.log("Si existe");
}
if(navigator.serviceWorker){
    console.log("si existe");
}
if(navigator.serviceWorker){
    navigator.serviceWorker.register("./sw.js");
}