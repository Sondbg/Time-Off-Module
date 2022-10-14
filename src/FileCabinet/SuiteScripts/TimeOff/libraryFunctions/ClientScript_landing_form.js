/**
 * @NScriptType ClientScript
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */
 define([], 

 function(){

    function pageInit(){

    }

 function redirectToCreate(form){
    var url=window.location.href;
    if(url.includes('&redirectForm')){
       url= url.replace('landForm','create')
    }else{
        url+= '&redirectForm='+'create';
    }
    window.location.href=url;
return false
        }

return{
    pageInit,
    saveRecord:redirectToCreate
}
 })