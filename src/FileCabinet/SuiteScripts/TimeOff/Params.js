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
                            LABEL: 'Create New'
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
                    NEW_REQUEST_GROUP:{
                        NAME: 'custpage_new_request_info',
                        LABEL: 'Request fields'
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
                },
                CREATE_FORM:{
                    CURRENTUSER:{
                        NAME:'custpage_request_user',
                        LABEL:'User'
                    },
                    PAID_DAYS_LEFT:{
                        NAME:'custpage_request_paid_days_left',
                        LABEL:'Paid Days Left'
                    },
                    WORK_HOME_DAYS_LEFT:{
                        NAME:'custpage_request_home_office_days_left',
                        LABEL:'REMAINING DAYS HOME OFFICE'
                    },
                    DATE_OF_REQUEST:{
                        NAME: 'custpage_request_date',
                        LABEL: 'Date of Request' 
                    },
                    FROM_DATE:{
                        NAME: 'custpage_from_date',
                        LABEL: 'From date' 
                    },
                    TO_DATE:{
                        NAME: 'custpage_to_date',
                        LABEL: 'To date' 
                    },
                    REQUEST_TYPE:{
                        NAME: 'custpage_request_type',
                        LABEL: 'Request Type'
                    },
                    REQUEST_OPTIONS:{
                        NAME: 'custpage_request_options',
                        LABEL:'Options'
                    },
                    APPROVER:{
                        NAME:'custpage_next_approver',
                        LABEL:'Next Approver'
                    },
                    REPLACE_EMPLOYEE:{
                        NAME:'custpage_replace_by',
                        LABEL:'Replace User'
                    },
                    PARTIAL_DAY:{
                        NAME:'custpage_partial_day',
                        LABEL:'Partial Day Off'
                    },
                    START_HOUR:{
                        NAME:'custpage_from_hour',
                        LABEL:'From (hour)'
                    },
                    END_HOUR:{
                        NAME:'custpage_until_hour',
                        LABEL:'To (hour)'
                    },
                    ATTACHED_FILE:{
                        NAME:'custpage_attached_file',
                        LABEL:'Attach File'
                    },
                    STATUS:{
                        NAME:'custpage_request_status',
                        LABEL:'Request Status'
                    },
                    SUBLIST:{
                        FROM_DATE:{
                          NAME:'custpage_sublist_from_date',
                          LABEL:'From Date'
                        },
                        TO_DATE:{
                            NAME:'custpage_sublist_to_date',
                            LABEL:'Until Date'
                        },
                        TYPE:{
                            NAME:'custpage_sublist_type_request',
                            LABEL:'Request Type'
                        },
                        OPTIONS:{
                            NAME:'custpage_sublist_options',
                            LABEL:'Options'
                        },
                        STATUS:{
                            NAME:'custpage_sublist_status',
                            LABEL:'Status'
                        },
                        DATE:{
                            NAME:'custpage_sublist_date',
                            LABEL:'Request Date'
                        },
                        START_HOUR:{
                            NAME:'custpage_sublist_start_hour',
                            LABEL:'Start Hour'
                        },
                        END_HOUR:{
                            NAME:'custpage_sublist_end_hour',
                            LABEL:'End Hour'
                        },
                        DAYS_REQUEST:{
                            NAME:'custpage_sublist_request_days',
                            LABEL:'Requested Days'
                        },
                        REPLACE_USER:{
                            NAME:'custpage_sublist_replace',
                            LABEL:'Replaced by'
                        },
                        PRINTBUTTON:{
                            NAME:'custpage_print_timeoff',
                            LABEL:'Print'
                        }
                    },
                    CALENDAR:{
                        NAME:'custpage_html_calendar',
                        LABEL:'Calendar'
                    },
                    DAYS_REQUESTED:{
                        NAME:'custpage_days_requested',
                        LABEL:'Request Days'
                    }
                    
                },
                BTS_TIME_OFF:{
                    USER:'custrecord_bts_time_off_user',
                    DATE_REQUEST:'custrecord_bts_time_off_date_request',
                    FROM_DATE:'custrecord_bts_time_off_date',
                    TO_DATE:'custrecord_bts_time_off_end_date',
                    REQUEST_TYPE:'custrecord_bts_time_off_type',
                    OPTIONS:'custrecord_bts_time_off_options',
                    APPROVER:'custrecord_bts_time_off_approver',
                    REPLACE_USER:'custrecord_bts_time_off_replac_user',
                    STATUS:'custrecord_bts_time_off_status',
                    PARTIAL_DAY:'custrecord_bts_time_off_partially',
                    START_HOUR:'custrecord_bts_time_off_start_hour',
                    END_HOUR:'custrecord_bts_time_off_end_hour',
                    EMPL_RECORD:'custrecord_bts_time_off_empl_record',
                    DAYS_REQUESTED:'custrecord_bts_holiday_days_request_off'
                },
                BANK_HOLIDAYS:{
                    START_DATE:'custrecord_bts_holiday_start_date',
                    END_DATE:'custrecord_bts_holiday_end_date'
                }
            },
            CUST_RECORDS:{
                TIME_OFF_REQUEST:'customrecord_bts_holiday_time_off',
                BANK_HOLIDAYS:'customrecord_bts_bank_holiday_days',
                PDF_TMPL:'CUSTTMPL_BTS_HOLIDAYS_TIME_OFF'
            },
            CALENDAR:{
                 MONTHS:{
                '0':'Януари',
                '1':'Февруари',
                '2':'Март',
                '3':'Април',
                '4':'Май',
                '5':'Юни',
                '6':'Юли',
                '7':'Август',
                '8':'Септември',
                '9':'Октомври',
                '10':'Ноември',
                '11':'Декември',
            },
            DAYS:{
                '1':'Понеделник',
                '2':'Вторник',
                '3':'Сряда',
                '4':'Четвъртък',
                '5':'Петък',
                '6':'Събота',
                '7':'Неделя',
            }
        }

        }

        return ScriptParameters
    })