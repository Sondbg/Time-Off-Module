/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define([],
    function () {
        var ScriptParameters = {
            FORM: {
                MAIN:{
                    NAME: 'Time Off Management'
                },
                CREATENEW:{
                    NAME: 'Create new Time Off Request'
                }
            },
            FIELDGROUPS: {
                SUITELET: {
                    BUTTONS: {
                        CREATE: {
                            NAME:'custpage_add_button',
                            LABEL: 'Save'
                        },
                        BACK:{
                            NAME:'custpage_back_button',
                            LABEL:'Back'
                        }
                    },
                    USERINFO: {
                        NAME: 'custpage_user_info',
                        LABEL: 'Current User Information'
                    },
                    SUBLIST: {
                        NAME: 'custpage_timeoff_sublist',
                        LABEL: 'Past time Off Requests'
                    }
                }
            },
            FIELDS: {
                SUITELET: {
                    CURRENTUSER: {
                        NAME: 'custpage_current_user',
                        LABEL: 'User'
                    },
                    WAITING_APPROVAL: {
                        NAME: 'custpage_waiting_approval',
                        LABEL: 'Days waiting for Approval'
                    },
                    PAID_DAYS_LEFT: {
                        NAME: 'custpage_paid_days_left',
                        LABEL: 'Paid days Left'
                    },
                    YEAR_PAID_DAYS: {
                        NAME: 'custpage_yearly_paid_days',
                        LABEL: 'Yearly Paid days'
                    },
                    WORK_HOME_DAYS: {
                        NAME: 'custpage_days_work_from_home',
                        LABEL: 'Days work from Home'
                    },
                    WORK_HOME_DAYS_LEFT: {
                        NAME: 'custpage_days_work_from_home_left',
                        LABEL: 'Remaining days Home Office'
                    },
                    SUBLIST: {
                        DATE: {
                            NAME: 'custpage_sublist_record_date',
                            LABEL: 'Date'
                        },
                        TYPE: {
                            NAME: 'custpage_sublist_record_type',
                            LABEL: 'Type'
                        },
                        STATUS: {
                            NAME: 'custpage_sublist_record_status',
                            LABEL: 'Status'
                        },
                        DAYS: {
                            NAME: 'custpage_sublist_record_days',
                            LABEL: 'Days'
                        },
                    }
                },
                EMPLOYEE_LIST: {
                    RECORD_TYPE: "customrecord_bts_holiday_employee_list",
                    EMPLOYEE: "custrecord_bts_holiday_employee",
                    APPROVER: "custrecord_bts_holiday_approver",
                    REPLACE_USER: "custrecord_bts_holiday_replace_user",
                    ADDRESS: "custrecord_bts_holiday_address",
                    ANNUAL_PAID_DAYS: "custrecord_bts_holiday_days_annual",
                    PAID_DAYS_PREV_YEAR: "custrecord_bts_holiday_paid_days_preyear",
                    WORK_DAYS_HOME: "custrecord_bts_working_days_home"
                },
                EXCEPTION_EMPLOYEE: {
                    RECORD_TYPE: "customrecord_bts_exception_days_off_empl",
                    PARENT: "custrecord_bts_ex_employee",
                    ANNUAL_PAID_DAYS: "custrecord_bts_paid_days_off",
                    WORK_DAYS_HOME: "custrecord_bts_beginn_day_home_work",
                    YEAR: "custrecord_bts_ex_employee_year",
                    LEFT_PAID_DAYS: "custrecord_bts_remai_paid_days",
                    LEFT_WORK_HOME: "custrecord_bts_work_home_days"
                }

            }

        }

        return ScriptParameters
    })