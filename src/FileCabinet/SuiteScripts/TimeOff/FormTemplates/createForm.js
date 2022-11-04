/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
 define(['N/ui/serverWidget','../Params','../libraryFunctions/search','../library/calendar'], 
 function(ui,parameters,search,calendar){
  function createNewForm(userID,objInfo){
 
  
     var form = ui.createForm({
         title: parameters.FORM.CREATENEW.NAME
     });

     form.clientScriptModulePath = '../libraryFunctions/ClientScript_create_form.js';

       /* user field groups */
     var userInfoGroup=form.addFieldGroup({
         id: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME,
         label: parameters.FIELDGROUPS.SUITELET.USERINFO.LABEL,
     });
 
     /* Back button */
     var backButton=form.addButton({
        id: parameters.FIELDGROUPS.SUITELET.BUTTONS.BACK.NAME,
        label: parameters.FIELDGROUPS.SUITELET.BUTTONS.BACK.LABEL,
        functionName: 'redirectToHome()'
     })

     /* Add new Button */
     var submitButton=form.addSubmitButton({
        label: parameters.FIELDGROUPS.SUITELET.BUTTONS.CREATE.LABEL,
     })


 
     /* user field */
     var userField=form.addField({
         id: parameters.FIELDS.CREATE_FORM.CURRENTUSER.NAME,
         type: ui.FieldType.SELECT,
         label: parameters.FIELDS.CREATE_FORM.CURRENTUSER.LABEL,
         source: 'employee',
         container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
     });
     userField.defaultValue=userID;
     userField.isMandatory=true

         /* paid Days Left for the User */
         var paidDaysLeft=form.addField({
             id: parameters.FIELDS.CREATE_FORM.PAID_DAYS_LEFT.NAME ,
             type: ui.FieldType.INTEGER,
             label: parameters.FIELDS.CREATE_FORM.PAID_DAYS_LEFT.LABEL,
             container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
         });
         paidDaysLeft.defaultValue=objInfo.leftPaidDays;
         setFieldDisplayType(paidDaysLeft,'INLINE');
 
         /* paid Home Office Days Left for the User */
         var homeOfficeDaysLeft=form.addField({
             id: parameters.FIELDS.CREATE_FORM.WORK_HOME_DAYS_LEFT.NAME ,
             type: ui.FieldType.INTEGER,
             label: parameters.FIELDS.CREATE_FORM.WORK_HOME_DAYS_LEFT.LABEL,
             container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
         });
         homeOfficeDaysLeft.defaultValue=objInfo.leftWorkHomeDays;
         setFieldDisplayType(homeOfficeDaysLeft,'INLINE');
 
        var requestFields=form.addFieldGroup({
            id: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME,
            label: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.LABEL,
        });
     
        /* current date */
        var dateOfRequest=form.addField({
            id: parameters.FIELDS.CREATE_FORM.DATE_OF_REQUEST.NAME,
            type: ui.FieldType.DATE,
            label:parameters.FIELDS.CREATE_FORM.DATE_OF_REQUEST.LABEL,
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
dateOfRequest.defaultValue=new Date();
setFieldDisplayType(dateOfRequest,'INLINE')

var approverField=form.addField({
    id: parameters.FIELDS.CREATE_FORM.APPROVER.NAME,
    type: ui.FieldType.SELECT,
    label: parameters.FIELDS.CREATE_FORM.APPROVER.LABEL,
    source: 'employee',
    container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
});
setFieldDisplayType(approverField,'INLINE');
var employeeRecord=search.HolidayEmployeeListSearch(userID);
approverField.defaultValue=employeeRecord.userApprover

        /* starting Date */
        var fromDate=form.addField({
            id: parameters.FIELDS.CREATE_FORM.FROM_DATE.NAME,
            type: ui.FieldType.DATE,
            label:parameters.FIELDS.CREATE_FORM.FROM_DATE.LABEL,
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
        fromDate.isMandatory=true;

        /* end Date */
        var toDate=form.addField({
            id: parameters.FIELDS.CREATE_FORM.TO_DATE.NAME,
            type: ui.FieldType.DATE,
            label:parameters.FIELDS.CREATE_FORM.TO_DATE.LABEL,
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
        toDate.isMandatory=true;

        var requestType=form.addField({
            id: parameters.FIELDS.CREATE_FORM.REQUEST_TYPE.NAME,
            type: ui.FieldType.SELECT,
            label:parameters.FIELDS.CREATE_FORM.REQUEST_TYPE.LABEL,
            source: 'customlist_bts_holuday_type',
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
        requestType.isMandatory=true;
        requestType.updateBreakType({
            breakType: ui.FieldBreakType.STARTCOL
        });

        var requestOptions=form.addField({
            id: parameters.FIELDS.CREATE_FORM.REQUEST_OPTIONS.NAME,
            type: ui.FieldType.SELECT,
            source: 'customlist_bts_holiday_request_option',
            label:parameters.FIELDS.CREATE_FORM.REQUEST_OPTIONS.LABEL,
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
        requestOptions.isMandatory=true;

        var replacedByEmployee=form.addField({
            id: parameters.FIELDS.CREATE_FORM.REPLACE_EMPLOYEE.NAME,
            type: ui.FieldType.SELECT,
            label: parameters.FIELDS.CREATE_FORM.REPLACE_EMPLOYEE.LABEL,
            source: 'employee',
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
        replacedByEmployee.isMandatory=true;

        var requestStatus=form.addField({
            id: parameters.FIELDS.CREATE_FORM.STATUS.NAME,
            type: ui.FieldType.SELECT,
            label: parameters.FIELDS.CREATE_FORM.STATUS.LABEL,
            source: 'customlist_bts_holiday_status',
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
        setFieldDisplayType(requestStatus,'INLINE');
        requestStatus.defaultValue=1;
        requestStatus.isMandatory=true;

        var partialDayOff=form.addField({
            id: parameters.FIELDS.CREATE_FORM.PARTIAL_DAY.NAME,
            type: ui.FieldType.CHECKBOX,
            label: parameters.FIELDS.CREATE_FORM.PARTIAL_DAY.LABEL,
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
partialDayOff.updateBreakType({
    breakType: ui.FieldBreakType.STARTCOL
});

        /* The next 2 fields need to be dynamically shown*/
        var startHour=form.addField({
            id: parameters.FIELDS.CREATE_FORM.START_HOUR.NAME,
            type: ui.FieldType.TIMEOFDAY,
            label: parameters.FIELDS.CREATE_FORM.START_HOUR.LABEL,
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
setFieldDisplayType(startHour,'DISABLED');

        var endHour=form.addField({
            id: parameters.FIELDS.CREATE_FORM.END_HOUR.NAME,
            type: ui.FieldType.TIMEOFDAY,
            label: parameters.FIELDS.CREATE_FORM.END_HOUR.LABEL,
            container: parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
        setFieldDisplayType(endHour,'DISABLED');

        var daysRequested=form.addField({
            id:parameters.FIELDS.CREATE_FORM.DAYS_REQUESTED.NAME,
            type: ui.FieldType.INTEGER,
            label:parameters.FIELDS.CREATE_FORM.DAYS_REQUESTED.LABEL,
            container:parameters.FIELDGROUPS.SUITELET.NEW_REQUEST_GROUP.NAME
        });
        setFieldDisplayType(daysRequested,'INLINE');
        
        var attachedFile=form.addField({
            id: parameters.FIELDS.CREATE_FORM.ATTACHED_FILE.NAME,
            type: ui.FieldType.FILE,
            label: parameters.FIELDS.CREATE_FORM.ATTACHED_FILE.LABEL
        })


       var calendarGroup=form.addFieldGroup({
            id: 'custpage_calendarGroup',
            label: 'Calendar',
        });
        var calendarHTML=form.addField({
            id: parameters.FIELDS.CREATE_FORM.CALENDAR.NAME,
            type: ui.FieldType.INLINEHTML,
            label: parameters.FIELDS.CREATE_FORM.CALENDAR.LABEL,
            container:'custpage_calendarGroup'
        });
        calendarHTML.defaultValue=calendar.buildTable()
/* Set the Field display Type If it's different from Normal */
function setFieldDisplayType(field,displayType){
field.updateDisplayType({
    displayType: ui.FieldDisplayType[displayType]
})
}
     return form
     }
     return{
        createNewForm
     }
 })
 