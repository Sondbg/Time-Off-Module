/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define(['N/search','N/log','../Params','N/format'],
/**
 * @param{search} search
 */
function(search,log,parameters,format) {

   /* find the Employee List Record */
   function HolidayEmployeeListSearch(userID){
      if(!userID){
return
      }
    var bts_holiday_employee_listSearchObj = search.create({
        type: parameters.FIELDS.EMPLOYEE_LIST.RECORD_TYPE,
        filters:
        [
           [parameters.FIELDS.EMPLOYEE_LIST.EMPLOYEE,"anyof",userID], 
           "AND", 
           ["isinactive","is","F"]
        ],
        columns:
        [
           search.createColumn({name: "internalid", sort: search.Sort.DESC, label: "Internal ID"}),
           search.createColumn({name: "name", label: "Name"}),
           search.createColumn({name: parameters.FIELDS.EMPLOYEE_LIST.EMPLOYEE, label: "Employee"}),
           search.createColumn({name: parameters.FIELDS.EMPLOYEE_LIST.APPROVER, label: "Approver"}),
           search.createColumn({name: parameters.FIELDS.EMPLOYEE_LIST.REPLACE_USER, label: "Replace Employee"}),
           search.createColumn({name: parameters.FIELDS.EMPLOYEE_LIST.ANNUAL_PAID_DAYS, label: "Annual Paid Days"}),
           search.createColumn({name: parameters.FIELDS.EMPLOYEE_LIST.PAID_DAYS_PREV_YEAR, label: "Annual Paid Days from Previous Year"}),
           search.createColumn({name: parameters.FIELDS.EMPLOYEE_LIST.WORK_DAYS_HOME, label: "Days Work from Home"})
        ]
     });
     var searchResultCount = bts_holiday_employee_listSearchObj.runPaged().count;
     if(searchResultCount==0){
        return false
     }
     var returnObj;
    
     bts_holiday_employee_listSearchObj.run().each(function(result){
       var employee_list_record_id= result.getValue({
        name: 'internalid'
       });
       var userApprover=result.getValue({
         name:parameters.FIELDS.EMPLOYEE_LIST.APPROVER
       });
       var replaceEmployee=result.getValue({
         name:parameters.FIELDS.EMPLOYEE_LIST.REPLACE_USER
       });

       var annualPaidDays=result.getValue({
        name:parameters.FIELDS.EMPLOYEE_LIST.ANNUAL_PAID_DAYS
      });

      var annualWorkHomeDays=result.getValue({
        name:parameters.FIELDS.EMPLOYEE_LIST.WORK_DAYS_HOME
      });

      var leftPaidDays='';;
      var leftWorkHomeDays='';
      //  log.debug("internalID of found BTS Holiday Employee Lists",employee_list_record_id);
      //  log.debug("search userApprover",userApprover)
       returnObj={
         employee_list_record_id,
         userApprover,
         replaceEmployee,
         annualPaidDays,
        annualWorkHomeDays,
        leftPaidDays,
        leftWorkHomeDays
       }
        
     });
     return returnObj
   }

   /*  find (if any) the Exception Employee Days Record*/
function exceptionEmployeeDaysSearch(parent){
   var date = new Date();
   var year=date.getFullYear().toString();

   var customrecord_bts_exception_days_off_emplSearchObj = search.create({
      type: parameters.FIELDS.EXCEPTION_EMPLOYEE.RECORD_TYPE,
      filters:
      [
         [parameters.FIELDS.EXCEPTION_EMPLOYEE.PARENT,"anyof",parent], 
         "AND", 
         [parameters.FIELDS.EXCEPTION_EMPLOYEE.YEAR,"is",year]
      ],
      columns:
      [
         search.createColumn({name: parameters.FIELDS.EXCEPTION_EMPLOYEE.ANNUAL_PAID_DAYS, label: "Beginning Annual Paid Days"}),
         search.createColumn({name: parameters.FIELDS.EXCEPTION_EMPLOYEE.WORK_DAYS_HOME, label: "Beginning Days Work from Home"}),
         search.createColumn({name: parameters.FIELDS.EXCEPTION_EMPLOYEE.YEAR, label: "Year"}),
         search.createColumn({name: parameters.FIELDS.EXCEPTION_EMPLOYEE.LEFT_PAID_DAYS, label: "Remaining Annual Paid Days"}),
         search.createColumn({name: parameters.FIELDS.EXCEPTION_EMPLOYEE.LEFT_WORK_HOME, label: "Work from Home days"})
      ]
   });
   var searchResultCount = customrecord_bts_exception_days_off_emplSearchObj.runPaged().count;
  //  log.debug("exception record count search",searchResultCount)
   if(searchResultCount==0){
      return false;
   }
   var returnObj;

   customrecord_bts_exception_days_off_emplSearchObj.run().each(function(result){
      var annualPaidDays=result.getValue({
         name:parameters.FIELDS.EXCEPTION_EMPLOYEE.ANNUAL_PAID_DAYS
       });
       var annualWorkHomeDays=result.getValue({
         name:parameters.FIELDS.EXCEPTION_EMPLOYEE.WORK_DAYS_HOME
       });
       var leftPaidDays=result.getValue({
         name:parameters.FIELDS.EXCEPTION_EMPLOYEE.LEFT_PAID_DAYS
       });
       var leftWorkHomeDays=result.getValue({
         name:parameters.FIELDS.EXCEPTION_EMPLOYEE.LEFT_WORK_HOME
       });
       
       returnObj={
         annualPaidDays,
         annualWorkHomeDays,
         leftPaidDays,
         leftWorkHomeDays
       }

   });
   return returnObj
  
}

function userTimeOffRequests(userID){
   var customrecord_bts_holiday_time_offSearchObj = search.create({
      type: parameters.CUST_RECORDS.TIME_OFF_REQUEST,
      filters:
      [
         [parameters.FIELDS.BTS_TIME_OFF.USER,"anyof",userID], 
         "AND", 
         [parameters.FIELDS.BTS_TIME_OFF.STATUS,"anyof","1","2","3"]
      ],
      columns:
      [
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.FROM_DATE, label: "Start Date"}),
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.TO_DATE, label: "End Date"}),
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.REQUEST_TYPE, label: "Type of Request"}),
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.OPTIONS, label: "Options"}),
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.REPLACE_USER, label: "Replace user"}),
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.STATUS, label: "Status"}),
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.START_HOUR, label: "Start Hour"}),
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.END_HOUR, label: "End Hour"}),
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.DAYS_REQUESTED, label: "Days of request of Time off"}),
         search.createColumn({name: parameters.FIELDS.BTS_TIME_OFF.DATE_REQUEST, label: "Date of Request"})
      ]
   });
   var searchResultCount = customrecord_bts_holiday_time_offSearchObj.runPaged().count;
   if(searchResultCount==0){
      return null
   }
  //  log.debug("customrecord_bts_holiday_time_offSearchObj result count",searchResultCount);
   var results=customrecord_bts_holiday_time_offSearchObj.run().getRange({
      start:0,
      end:1000
   });
   // log.debug('results',results)
   var returnArr=[]

for (var i=0;i<results.length;i++){
var result=results[i]
      var resultObj;
    var dateOfRequest=result.getValue({
      name:parameters.FIELDS.BTS_TIME_OFF.DATE_REQUEST
    });
    var startDate=result.getValue({
      name:parameters.FIELDS.BTS_TIME_OFF.FROM_DATE
    });
    var endDate=result.getValue({
      name:parameters.FIELDS.BTS_TIME_OFF.TO_DATE
    });
    var requestType=result.getText({
      name:parameters.FIELDS.BTS_TIME_OFF.REQUEST_TYPE
    });
    var options=result.getText({
      name:parameters.FIELDS.BTS_TIME_OFF.OPTIONS
    });
    var replaceUser=result.getText({
      name:parameters.FIELDS.BTS_TIME_OFF.REPLACE_USER
    });
    var status=result.getText({
      name:parameters.FIELDS.BTS_TIME_OFF.STATUS
    });
    var startHour=result.getValue({
      name:parameters.FIELDS.BTS_TIME_OFF.START_HOUR
    });
    var endHour=result.getValue({
      name:parameters.FIELDS.BTS_TIME_OFF.END_HOUR
    });
    var daysRequested=result.getValue({
      name:parameters.FIELDS.BTS_TIME_OFF.DAYS_REQUESTED
    });

 resultObj={
   dateOfRequest,
   startDate,
   endDate,
   endHour,
   requestType,
   options,
   replaceUser,
   status,
   startHour,
   endHour,
   daysRequested
    }
    returnArr.push(resultObj)
      // .run().each has a limit of 4,000 results
  
   };
   return returnArr;

}

function timeOffWaitingApproval(userID){
  var customrecord_bts_holiday_time_offSearchObj = search.create({
    type: "customrecord_bts_holiday_time_off",
    filters:
    [
       [parameters.FIELDS.BTS_TIME_OFF.USER,"anyof",userID], 
       "AND", 
       [parameters.FIELDS.BTS_TIME_OFF.STATUS,"anyof","1"]
    ],
    columns:
    [
       search.createColumn({
          name: "formulanumeric",
          summary: "SUM",
          formula: "TO_NUMBER({custrecord_bts_holiday_days_request_off})",
          label: "Formula (Numeric)"
       })
    ]
 });

 var result=customrecord_bts_holiday_time_offSearchObj.run().getRange({
  start:0,
  end:1
});
var days= result[0].getValue({
  name:'formulanumeric',
  summary:search.Summary.SUM
})
// log.debug('days waiting for Approval',days)
return days
 
}

function bankHolidaysWithin(startDate,endDate){
  startDate=format.format({
    value:startDate,
    type: format.Type.DATE
  });
  endDate=format.format({
    value:endDate,
    type: format.Type.DATE
  });
  var customrecord_bts_bank_holiday_daysSearchObj = search.create({
    type: parameters.CUST_RECORDS.BANK_HOLIDAYS,
    filters:
    [
       [parameters.FIELDS.BANK_HOLIDAYS.START_DATE,"onorafter",startDate], 
       "AND", 
       [parameters.FIELDS.BANK_HOLIDAYS.END_DATE,"onorbefore",endDate]
    ],
    columns:
    [
       search.createColumn({name: "custrecord_bts_holiday_start_date", label: "Start Date"}),
       search.createColumn({name: "custrecord_bts_holiday_end_date", label: "End Date"})
    ]
 });
 var searchResultCount = customrecord_bts_bank_holiday_daysSearchObj.runPaged().count;
 log.debug("customrecord_bts_bank_holiday_daysSearchObj result count",searchResultCount);
 if(searchResultCount==0){
  return false
 }
var returnArr=[]
 customrecord_bts_bank_holiday_daysSearchObj.run().each(function(result){
   var startDate=result.getValue({
      name:parameters.FIELDS.BANK_HOLIDAYS.START_DATE
    });
    var endDate=result.getValue({
      name:parameters.FIELDS.BANK_HOLIDAYS.END_DATE
    });

returnArr.push({startDate,endDate});
 });
 
return returnArr
}
    return {
      HolidayEmployeeListSearch,
      exceptionEmployeeDaysSearch,
      userTimeOffRequests,
      timeOffWaitingApproval,
      bankHolidaysWithin
    };
    
});
