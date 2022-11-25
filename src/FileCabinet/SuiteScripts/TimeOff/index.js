/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/render','N/redirect','N/ui/serverWidget','N/record', 'N/runtime','./libraryFunctions/search','N/log','N/error','N/url','./Params','./FormTemplates/returnForms','./libraryFunctions/createRecord','./libraryFunctions/renderPDF'],

    (render,redirect,ui,record, runtime, search, log, error, url,parameters,returnForms,createRecord,renderPDF) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
       function onRequest (scriptContext)  {
        var scriptObj=runtime.getCurrentScript();
        var deploymentID=scriptObj.deploymentId;
        var scriptID=scriptObj.id;
        var btsRecordId=scriptContext.request.parameters.timeOffID;



            if (scriptContext.request.method === 'GET') {
                if(btsRecordId){
                    scriptContext.response.writeFile(renderPDF(btsRecordId),true)
                }


var formToUse=scriptContext.request.parameters.redirectForm || 'landForm';
// log.debug('request params',formToUse);
                var user=runtime.getCurrentUser();
                var userID=user.id;

                var employeeListSearch=search.HolidayEmployeeListSearch(userID);
var exceptionSearchResult=search.exceptionEmployeeDaysSearch(employeeListSearch.employee_list_record_id);
var result;
if(exceptionSearchResult==false){
    log.debug('exception returned false');
    result=employeeListSearch;
// да върне съобщение ако липсва документ
}else{
result=exceptionSearchResult
}
 var form=returnForms[formToUse](userID,result,{deploymentID,scriptID});
                scriptContext.response.writePage(form);
            }
            
if(scriptContext.request.method === 'POST'){
           if(createRecord(scriptContext)){
            redirect.toSuitelet({
                scriptId: scriptID,
                deploymentId: deploymentID,
            });
            log.debug('scriptContext',scriptContext.request)
           }

            }
            
        }


        return {onRequest:onRequest}

    });
