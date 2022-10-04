/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/runtime','../Params'], 
function(ui,runtime,parameters){
 function createLandingForm(userID,objInfo){

 
    var form = ui.createForm({
        title: parameters.FORM.MAIN.NAME
    });
    form.clientScriptModulePath = '../libraryFunctions/ClientScript_Forms.js';
   
    /* user field groups */
    var userInfoGroup=form.addFieldGroup({
        id: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME,
        label: parameters.FIELDGROUPS.SUITELET.USERINFO.LABEL,
    });

    /* Add new Button */
    var addButton=form.addButton({
        id: parameters.FIELDGROUPS.SUITELET.BUTTONS.CREATE.NAME,
        label: parameters.FIELDGROUPS.SUITELET.BUTTONS.CREATE.LABEL,
        functionName: 'redirectToHome("create")'
    })


    /* user field */
    var userField=form.addField({
        id: parameters.FIELDS.SUITELET.CURRENTUSER.NAME,
        type: ui.FieldType.SELECT,
        label: parameters.FIELDS.SUITELET.CURRENTUSER.LABEL,
        source: 'employee',
        container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
    });
    userField.defaultValue=userID;
    userField.updateDisplayType({
        displayType: ui.FieldDisplayType.INLINE
    });
    /* Days waiting for approval */

    var waitingApproval=form.addField({
        id: parameters.FIELDS.SUITELET.WAITING_APPROVAL.NAME ,
        type: ui.FieldType.TEXT,
        label: parameters.FIELDS.SUITELET.WAITING_APPROVAL.LABEL,
        container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
    });
    waitingApproval.defaultValue='needs to be Search';
    waitingApproval.updateDisplayType({
        displayType: ui.FieldDisplayType.INLINE
    });

    /* Yearly Paid Days for the user */
    var YearlyPaidDays=form.addField({
        id: parameters.FIELDS.SUITELET.YEAR_PAID_DAYS.NAME ,
        type: ui.FieldType.TEXT,
        label: parameters.FIELDS.SUITELET.YEAR_PAID_DAYS.LABEL,
        container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
    });
    YearlyPaidDays.defaultValue=objInfo.annualPaidDays;
    YearlyPaidDays.updateDisplayType({
        displayType: ui.FieldDisplayType.INLINE
    });
    YearlyPaidDays.updateBreakType({
        breakType: ui.FieldBreakType.STARTCOL
    });

        /* paid Days Left for the User */
        var paidDaysLeft=form.addField({
            id: parameters.FIELDS.SUITELET.PAID_DAYS_LEFT.NAME ,
            type: ui.FieldType.TEXT,
            label: parameters.FIELDS.SUITELET.PAID_DAYS_LEFT.LABEL,
            container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
        });
        paidDaysLeft.defaultValue=objInfo.leftPaidDays;
        paidDaysLeft.updateDisplayType({
            displayType: ui.FieldDisplayType.INLINE
        });

    /* Yearly Paid Home Office Days for the user */
    var daysWorkHome=form.addField({
        id: parameters.FIELDS.SUITELET.WORK_HOME_DAYS.NAME ,
        type: ui.FieldType.TEXT,
        label: parameters.FIELDS.SUITELET.WORK_HOME_DAYS.LABEL,
        container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
    });
    daysWorkHome.defaultValue=objInfo.annualWorkHomeDays;
    daysWorkHome.updateDisplayType({
        displayType: ui.FieldDisplayType.INLINE
    });
    daysWorkHome.updateBreakType({
        breakType: ui.FieldBreakType.STARTCOL
    });

        /* paid Home Office Days Left for the User */
        var homeOfficeDaysLeft=form.addField({
            id: parameters.FIELDS.SUITELET.WORK_HOME_DAYS_LEFT.NAME ,
            type: ui.FieldType.TEXT,
            label: parameters.FIELDS.SUITELET.WORK_HOME_DAYS_LEFT.LABEL,
            container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
        });
        homeOfficeDaysLeft.defaultValue=objInfo.leftWorkHomeDays;
        homeOfficeDaysLeft.updateDisplayType({
            displayType: ui.FieldDisplayType.INLINE
        });

    /* Sublist with recent Time Off Requests*/

    var timeOffSublsit=form.addSublist({
        id: parameters.FIELDGROUPS.SUITELET.SUBLIST.NAME,
        type:ui.SublistType.LIST,
        label: parameters.FIELDGROUPS.SUITELET.SUBLIST.LABEL
    });

  /* Sublist Fields */
    timeOffSublsit.addField({
        id: parameters.FIELDS.SUITELET.SUBLIST.DATE.NAME,
        type:ui.FieldType.DATE,
        label:parameters.FIELDS.SUITELET.SUBLIST.DATE.LABEL
    });
    timeOffSublsit.addField({
        id: parameters.FIELDS.SUITELET.SUBLIST.TYPE.NAME,
        type:ui.FieldType.TEXT,
        label:parameters.FIELDS.SUITELET.SUBLIST.TYPE.LABEL
    });
    timeOffSublsit.addField({
        id: parameters.FIELDS.SUITELET.SUBLIST.STATUS.NAME,
        type:ui.FieldType.TEXT,
        label:parameters.FIELDS.SUITELET.SUBLIST.STATUS.LABEL
    });
    timeOffSublsit.addField({
        id: parameters.FIELDS.SUITELET.SUBLIST.DAYS.NAME,
        type:ui.FieldType.INTEGER,
        label:parameters.FIELDS.SUITELET.SUBLIST.DAYS.LABEL
    });


    return form
    }
    return{
        createLandingForm
    }
})