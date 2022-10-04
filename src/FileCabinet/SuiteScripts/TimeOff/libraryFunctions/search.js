/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define(['N/search','N/log','../Params'],
/**
 * @param{search} search
 */
function(search,log,parameters) {

   /* find the Employee List Record */
   function HolidayEmployeeListSearch(userID){
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
       })
       log.debug("internalID of found BTS Holiday Employee Lists",employee_list_record_id)
       returnObj={
         employee_list_record_id,
         userApprover,
         replaceEmployee
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
   log.debug("exception record count search",searchResultCount)
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
    return {
      HolidayEmployeeListSearch,
      exceptionEmployeeDaysSearch
    };
    
});
