/**
 * @NScriptType ClientScript
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */
 define(['../Params','N/record','N/log','N/error','./search','N/runtime'], 

    function(parameters,record,log,error,search,runtime){
   
       function pageInit(){
   
       }
   
    function redirectToHome(){
       var url=window.location.href;
    url=url.replace('create','landForm');
   
       window.location.href=url;

           }
   
    function fieldChanged(scriptContext){
        var currentRecord=scriptContext.currentRecord;
        try{
       
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
}else if(scriptContext.fieldId==parameters.FIELDS.CREATE_FORM.CURRENTUSER.NAME){

    var recordUser=currentRecord.getValue({
        fieldId:parameters.FIELDS.CREATE_FORM.CURRENTUSER.NAME
    });
    var approver=search.HolidayEmployeeListSearch(recordUser)
    // log.debug('field User',recordUser);
    // log.debug('search result CS',approver);
    // debugger;
    currentRecord.setValue({
        fieldId:parameters.FIELDS.CREATE_FORM.APPROVER.NAME,
        value: search.HolidayEmployeeListSearch(recordUser).userApprover
    })
}else if(scriptContext.fieldId==parameters.FIELDS.CREATE_FORM.TO_DATE.NAME || scriptContext.fieldId==parameters.FIELDS.CREATE_FORM.FROM_DATE.NAME ){
    var startDate=currentRecord.getValue({
        fieldId:parameters.FIELDS.CREATE_FORM.FROM_DATE.NAME
    });
    var endDate=currentRecord.getValue({
        fieldId:parameters.FIELDS.CREATE_FORM.TO_DATE.NAME
    });
    if(!startDate || !endDate){
return
    }
    var counter=0;
    // arr with Objects
    var holidays=search.bankHolidaysWithin(startDate,endDate);

   if(startDate<=endDate){
    for (startDate; startDate <= endDate; startDate.setDate(startDate.getDate()+1)) {
       var dayOfWeek=startDate.getDay();
       debugger;
        var flag=true // not holiday

        if(dayOfWeek!=6 && dayOfWeek!=0){
            if(holidays){
                for (var i = 0; i < holidays.length; i++) {
                   
                    var startHolidays= new Date(holidays[i].startDate);
                    var endHolidays= new Date(holidays[i].endDate);
        
                    if(startDate>=startHolidays && startDate<=endHolidays){
        flag=false;
        continue
                    }
                }
               }
           if(flag){
         counter++
           }
            
       } 
     
      
       
    }
   }
   currentRecord.setValue({
    fieldId:parameters.FIELDS.CREATE_FORM.DAYS_REQUESTED.NAME,
    value: counter
})


}
    }catch(err){
       var custErr=error.create({
            name: 'Something went wrong',
            message: err,
            notifyOff: true
        });
        throw custErr
    }
}


   return{
       pageInit,
       redirectToHome:redirectToHome,
       fieldChanged,

   }
    })