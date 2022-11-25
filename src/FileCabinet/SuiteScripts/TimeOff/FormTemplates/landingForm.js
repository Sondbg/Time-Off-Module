/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/runtime', '../Params', '../libraryFunctions/search','../libraryFunctions/getSuiteletURL'],
    function (ui, runtime, parameters, search, buildSuiteletURL) {
        function createLandingForm(userID, objInfo, suiteletObj) {


            var form = ui.createForm({
                title: parameters.FORM.MAIN.NAME
            });
            form.clientScriptModulePath = '../libraryFunctions/ClientScript_landing_form.js';

            /* user field groups */
            var userInfoGroup = form.addFieldGroup({
                id: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME,
                label: parameters.FIELDGROUPS.SUITELET.USERINFO.LABEL,
            });

            /* Add new Button */
            var addButton = form.addSubmitButton({
                label: parameters.FIELDGROUPS.SUITELET.BUTTONS.CREATE.LABEL,
            })


            /* user field */
            var userField = form.addField({
                id: parameters.FIELDS.SUITELET.CURRENTUSER.NAME,
                type: ui.FieldType.SELECT,
                label: parameters.FIELDS.SUITELET.CURRENTUSER.LABEL,
                source: 'employee',
                container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
            });
            userField.defaultValue = userID;
            setFieldDisplayType(userField, 'INLINE');
            
            /* Days waiting for approval */
            var waitingApproval = form.addField({
                id: parameters.FIELDS.SUITELET.WAITING_APPROVAL.NAME,
                type: ui.FieldType.TEXT,
                label: parameters.FIELDS.SUITELET.WAITING_APPROVAL.LABEL,
                container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
            });
            waitingApproval.defaultValue = search.timeOffWaitingApproval(userID)
            setFieldDisplayType(waitingApproval, 'INLINE');

            /* Yearly Paid Days for the user */
            var YearlyPaidDays = form.addField({
                id: parameters.FIELDS.SUITELET.YEAR_PAID_DAYS.NAME,
                type: ui.FieldType.TEXT,
                label: parameters.FIELDS.SUITELET.YEAR_PAID_DAYS.LABEL,
                container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
            });
            YearlyPaidDays.defaultValue = objInfo.annualPaidDays;
            setFieldDisplayType(YearlyPaidDays, 'INLINE');
            YearlyPaidDays.updateBreakType({
                breakType: ui.FieldBreakType.STARTCOL
            });

            /* paid Days Left for the User */
            var paidDaysLeft = form.addField({
                id: parameters.FIELDS.SUITELET.PAID_DAYS_LEFT.NAME,
                type: ui.FieldType.TEXT,
                label: parameters.FIELDS.SUITELET.PAID_DAYS_LEFT.LABEL,
                container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
            });
            paidDaysLeft.defaultValue = objInfo.leftPaidDays;
            setFieldDisplayType(paidDaysLeft, 'INLINE');

            /* Yearly Paid Home Office Days for the user */
            var daysWorkHome = form.addField({
                id: parameters.FIELDS.SUITELET.WORK_HOME_DAYS.NAME,
                type: ui.FieldType.TEXT,
                label: parameters.FIELDS.SUITELET.WORK_HOME_DAYS.LABEL,
                container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
            });
            daysWorkHome.defaultValue = objInfo.annualWorkHomeDays;
            setFieldDisplayType(daysWorkHome, 'INLINE');
            daysWorkHome.updateBreakType({
                breakType: ui.FieldBreakType.STARTCOL
            });

            /* paid Home Office Days Left for the User */
            var homeOfficeDaysLeft = form.addField({
                id: parameters.FIELDS.SUITELET.WORK_HOME_DAYS_LEFT.NAME,
                type: ui.FieldType.TEXT,
                label: parameters.FIELDS.SUITELET.WORK_HOME_DAYS_LEFT.LABEL,
                container: parameters.FIELDGROUPS.SUITELET.USERINFO.NAME
            });
            homeOfficeDaysLeft.defaultValue = objInfo.leftWorkHomeDays;
            setFieldDisplayType(homeOfficeDaysLeft, 'INLINE');

            /* Sublist with recent Time Off Requests*/

            var timeOffSublsit = form.addSublist({
                id: parameters.FIELDGROUPS.SUITELET.SUBLIST.NAME,
                type: ui.SublistType.STATICLIST,
                label: parameters.FIELDGROUPS.SUITELET.SUBLIST.LABEL
            });

            /* Sublist Fields */
            //print Button
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.PRINTBUTTON.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.PRINTBUTTON.LABEL)
            //DATE
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.DATE.NAME,'DATE',parameters.FIELDS.CREATE_FORM.SUBLIST.DATE.LABEL)
            //DAYS OF REQUEST
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.DAYS_REQUEST.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.DAYS_REQUEST.LABEL)
            //FROM DATE
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.FROM_DATE.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.FROM_DATE.LABEL)
            //END DATE
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.TO_DATE.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.TO_DATE.LABEL)
            //TYPE
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.TYPE.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.TYPE.LABEL)
            //OPTIONS
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.OPTIONS.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.OPTIONS.LABEL)
            //REPLACE USER 
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.REPLACE_USER.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.REPLACE_USER.LABEL)
            //STATUS
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.STATUS.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.STATUS.LABEL)
            //START HOUR
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.START_HOUR.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.START_HOUR.LABEL)
            //END_HOUR 
            addField(parameters.FIELDS.CREATE_FORM.SUBLIST.END_HOUR.NAME,'TEXT',parameters.FIELDS.CREATE_FORM.SUBLIST.END_HOUR.LABEL)
            function addField(id, type, label) {
                timeOffSublsit.addField({
                    id: id,
                    type: ui.FieldType[type],
                    label: label
                });
            }

            function setFieldDisplayType(field, displayType) {
                field.updateDisplayType({
                    displayType: ui.FieldDisplayType[displayType]
                })
            }

            
            var sublistArr = search.userTimeOffRequests(userID);
            if (sublistArr.length == 0) {
                return form
            }

            for (var i = 0; i < sublistArr.length; i++) {
                // log.debug('array element', sublistArr[i])
                var suiteletUrlRecordId=buildSuiteletURL(suiteletObj.scriptID,suiteletObj.deploymentID,sublistArr[i].internalId)
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.PRINTBUTTON.NAME,i,`<a href="${suiteletUrlRecordId}" target="_blank" style="color:#255599 !important">Print</a>`)
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.FROM_DATE.NAME, i, sublistArr[i].startDate);
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.DATE.NAME, i, sublistArr[i].dateOfRequest);
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.TO_DATE.NAME, i, sublistArr[i].endDate);
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.START_HOUR.NAME, i, sublistArr[i].startHour);
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.END_HOUR.NAME, i, sublistArr[i].endHour);
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.DAYS_REQUEST.NAME, i, sublistArr[i].daysRequested);
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.TYPE.NAME, i, sublistArr[i].requestType);
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.OPTIONS.NAME, i, sublistArr[i].options);
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.STATUS.NAME, i, sublistArr[i].status);
                addSublistValue(parameters.FIELDS.CREATE_FORM.SUBLIST.REPLACE_USER.NAME, i, sublistArr[i].replaceUser);
            }

            function addSublistValue(id, line, value) {
                if (!value) {
                    return
                }
                timeOffSublsit.setSublistValue({
                    id: id,
                    line: line,
                    value: value
                });
            }
            return form
        }
        return {
            createLandingForm
        }
    })
