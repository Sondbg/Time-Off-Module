/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
 define(['../Params','N/record','N/log','N/error','N/format'],
    function (parameters,record,log,error,format) {
        function createRecord(context){
    var contextParam=context.request.parameters;
    try{

var currUser=contextParam[parameters.FIELDS.CREATE_FORM.CURRENTUSER.NAME]

var fromDate=contextParam[parameters.FIELDS.CREATE_FORM.FROM_DATE.NAME]
fromDate=format.parse({
    value:fromDate,
    type:format.Type.DATE
});

var toDate=contextParam[parameters.FIELDS.CREATE_FORM.TO_DATE.NAME]
toDate=format.parse({
    value:toDate,
    type:format.Type.DATE
});

var requestType=contextParam[parameters.FIELDS.CREATE_FORM.REQUEST_TYPE.NAME]

var options=contextParam[parameters.FIELDS.CREATE_FORM.REQUEST_OPTIONS.NAME]

var approver=contextParam[parameters.FIELDS.CREATE_FORM.APPROVER.NAME]


var replaceUser=contextParam[parameters.FIELDS.CREATE_FORM.REPLACE_EMPLOYEE.NAME]

var partialDay=contextParam[parameters.FIELDS.CREATE_FORM.PARTIAL_DAY.NAME]
partialDay=='F'?partialDay=false:partialDay=true;

var startHour=contextParam[parameters.FIELDS.CREATE_FORM.START_HOUR.NAME]

var endHour=contextParam[parameters.FIELDS.CREATE_FORM.END_HOUR.NAME]

/*Check mandatory fields, throw Error */
if(!fromDate || !toDate || !requestType || !options || !replaceUser){
var errorPopup=error.create({
    code:'Mandatory fields',
    message:'Please fill ALL mandatory fields!'
});
throw errorPopup.message

}
// check if Partial Day, throw Error if there are missing hours
if(partialDay=='T' && (!startHour || !endHour)){
var errorPopup=error.create({
    code:'Mandatory fields',
    message:'Please fill the Hour fields!'
});
throw errorPopup.message
}

// var newTimeOffPromise=record.create.promise({
// type:parameters.CUST_RECORDS.TIME_OFF_REQUEST,
// isDynamic:true
// });

var newRecord=record.create({
    type:parameters.CUST_RECORDS.TIME_OFF_REQUEST,
    isDynamic:true
})
// newTimeOffPromise.then(function(recordObj){
// log.debug('THEN new Promise')

newRecord.setValue({
    fieldId:'custrecord_bts_time_off_user',
     value:currUser
 })
 newRecord.setValue({
    fieldId:'custrecord_bts_time_off_date_request',
    value: new Date()
});
newRecord.setValue({
    fieldId:'custrecord_bts_time_off_date',
    value:fromDate
});
newRecord.setValue({
    fieldId:'custrecord_bts_time_off_end_date',
    value:toDate
});

newRecord.setValue({
    fieldId:'custrecord_bts_time_off_type',
    value:requestType
});
newRecord.setValue({
    fieldId:'custrecord_bts_time_off_options',
    value:options
});
newRecord.setValue({
    fieldId:'custrecord_bts_time_off_approver',
    value:approver
});
newRecord.setValue({
    fieldId:'custrecord_bts_time_off_replac_user',
    value:replaceUser
});
newRecord.setValue({
    fieldId:'custrecord_bts_time_off_status',
    value:1
});
newRecord.setValue({
    fieldId:'custrecord_bts_time_off_partially',
    value:partialDay
});
newRecord.setValue({
    fieldId:'custrecord_bts_time_off_start_hour',
    value:startHour
});
newRecord.setValue({
    fieldId:'custrecord_bts_time_off_end_hour',
    value:endHour
});

var recordID=newRecord.save();
if(recordID){
    log.debug('redirect',recordID)
return true
}else{
    throw new Error('failed to create/obtain New Time Off')
}



// })

//FILE UPLOAD
}catch(e){
throw e
        }
}
return createRecord
    })