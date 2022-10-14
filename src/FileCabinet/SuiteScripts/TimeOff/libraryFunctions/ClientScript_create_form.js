/**
 * @NScriptType ClientScript
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */
 define(['../Params','N/record','N/log','N/error'], 

    function(parameters,record,log,error){
   
       function pageInit(){
   
       }
   
    function redirectToHome(){
       var url=window.location.href;
    url=url.replace('create','landForm');
   
       window.location.href=url;

           }
   
    function fieldChanged(scriptContext){
        var currentRecord=scriptContext.currentRecord;
if(scriptContext.fieldId==parameters.FIELDS.CREATE_FORM.PARTIAL_DAY.NAME){
    var checkPartialDay=currentRecord.getValue({
        fieldId:parameters.FIELDS.CREATE_FORM.PARTIAL_DAY.NAME
    });
    var flag;
    checkPartialDay==true?flag=false:flag=true;

    currentRecord.getField({
        fieldId:parameters.FIELDS.CREATE_FORM.START_HOUR.NAME
    }).isDisabled=flag

    currentRecord.getField({
        fieldId:parameters.FIELDS.CREATE_FORM.END_HOUR.NAME
    }).isDisabled=flag
}
    }


   return{
       pageInit,
       redirectToHome:redirectToHome,
       fieldChanged,

   }
    })