/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
 define(['N/ui/serverWidget','../Params'], 
 function(ui,parameters){
  function createNewForm(userID,objInfo){
 
  
     var form = ui.createForm({
         title: parameters.FORM.CREATENEW.NAME
     });

     form.clientScriptModulePath = '../libraryFunctions/ClientScript_Forms.js';

       /* user field groups */
     var userInfoGroup=form.addFieldGroup({
         id: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME,
         label: parameters.FIELDGROUPS.SUITELET.USERINFO.LABEL,
     });
 
     /* Back button */
     var backButton=form.addButton({
        id: parameters.FIELDGROUPS.SUITELET.BUTTONS.BACK.NAME,
        label: parameters.FIELDGROUPS.SUITELET.BUTTONS.BACK.LABEL,
     })

     /* Add new Button */
     var submitButton=form.addSubmitButton({
        label: parameters.FIELDGROUPS.SUITELET.BUTTONS.CREATE.LABEL,
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
 
         /* paid Days Left for the User */
         var paidDaysLeft=form.addField({
             id: parameters.FIELDS.SUITELET.PAID_DAYS_LEFT.NAME ,
             type: ui.FieldType.INTEGER,
             label: parameters.FIELDS.SUITELET.PAID_DAYS_LEFT.LABEL,
             container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
         });
         paidDaysLeft.defaultValue=objInfo.leftPaidDays;
 
 
         /* paid Home Office Days Left for the User */
         var homeOfficeDaysLeft=form.addField({
             id: parameters.FIELDS.SUITELET.WORK_HOME_DAYS_LEFT.NAME ,
             type: ui.FieldType.INTEGER,
             label: parameters.FIELDS.SUITELET.WORK_HOME_DAYS_LEFT.LABEL,
             container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
         });
         homeOfficeDaysLeft.defaultValue=objInfo.leftWorkHomeDays;
 
 
     
     return form
     }
     return{
        createNewForm
     }
 })
 