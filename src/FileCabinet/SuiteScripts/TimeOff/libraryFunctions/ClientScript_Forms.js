/**
 * @NScriptType ClientScript
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */
 define([], 

 function(){

    function pageInit(){

    }

 function redirectToHome(form){
    var url=window.location.href;
    url+= '&redirectForm='+form;
    window.location.href=url
        }

return{
    pageInit,
    redirectToHome
}
 })