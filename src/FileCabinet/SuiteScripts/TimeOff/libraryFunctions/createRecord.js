/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
 define(['../Params','N/record','N/log','N/error','N/format','./search'],
    function (parameters,record,log,error,format,search) {
        function createRecord(context){
    var contextParam=context.request.parameters;
    try{

var currUser=contextParam[parameters.FIELDS.CREATE_FORM.CURRENTUSER.NAME]
var daysRequested=contextParam[parameters.FIELDS.CREATE_FORM.DAYS_REQUESTED.NAME];
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

// var approver=contextParam[parameters.FIELDS.CREATE_FORM.APPROVER.NAME]


var replaceUser=contextParam[parameters.FIELDS.CREATE_FORM.REPLACE_EMPLOYEE.NAME]

var partialDay=contextParam[parameters.FIELDS.CREATE_FORM.PARTIAL_DAY.NAME]
partialDay=='F'?partialDay=false:partialDay=true;

if(partialDay){
    var startHour=contextParam[parameters.FIELDS.CREATE_FORM.START_HOUR.NAME]
    var startHours=new Date();
    startHours.setTime(format.parse({
        value:startHour,
        type:format.Type.TIMEOFDAY
    }))
    
    var endHour=contextParam[parameters.FIELDS.CREATE_FORM.END_HOUR.NAME]
    var endHours=new Date();
    endHours.setTime(format.parse({
        value:endHour,
        type:format.Type.TIMEOFDAY
    }));
    
    log.debug('start hours',startHours)
}


/*Check mandatory fields, throw Error */
if(!fromDate || !toDate || !requestType || !options || !replaceUser){
var errorPopup=error.create({
    code:'Mandatory fields',
    message:'Please fill ALL mandatory fields!'
});
throw errorPopup.message

}
// check if Partial Day, throw Error if there are missing hours
if(partialDay==true && (!startHour || !endHour)){
var errorPopup=error.create({
    code:'Mandatory fields',
    message:'Please fill the Hour fields!'
});
throw errorPopup.message
}


var newRecord=record.create({
    type:parameters.CUST_RECORDS.TIME_OFF_REQUEST,
    isDynamic:true
})

newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.USER,
     value:currUser
 })
 newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.DAYS_REQUESTED,
    value:daysRequested
 })
 newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.DATE_REQUEST,
    value: new Date()
});
newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.FROM_DATE,
    value:fromDate
});
newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.TO_DATE,
    value:toDate
});

newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.REQUEST_TYPE,
    value:requestType
});
newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.OPTIONS,
    value:options
});

newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.REPLACE_USER,
    value:replaceUser
});
newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.STATUS,
    value:1
});
newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.PARTIAL_DAY,
    value:partialDay
});

if(partialDay){
    newRecord.setValue({
        fieldId:parameters.FIELDS.BTS_TIME_OFF.START_HOUR,
        value:startHours
    });
    newRecord.setValue({
        fieldId:parameters.FIELDS.BTS_TIME_OFF.END_HOUR,
        value:endHours
    });
}


// set Approver
var employeeHolidayRecord=search.HolidayEmployeeListSearch(currUser);

newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.APPROVER,
    value:employeeHolidayRecord.userApprover
})

// set employee record
newRecord.setValue({
    fieldId:parameters.FIELDS.BTS_TIME_OFF.EMPL_RECORD,
    value:employeeHolidayRecord.employee_list_record_id
})

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