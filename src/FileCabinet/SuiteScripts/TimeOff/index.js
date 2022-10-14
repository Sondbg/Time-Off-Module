/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/redirect','N/ui/serverWidget','N/record', 'N/runtime','./libraryFunctions/search','N/log','N/error','N/url','./Params','./FormTemplates/returnForms','./libraryFunctions/createRecord'],

    (redirect,ui,record, runtime, search, log, error, url,parameters,returnForms,createRecord) => {
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
        var scriptURL= url.resolveScript({
            deploymentId: deploymentID,
            scriptId: scriptID,
            returnExternalUrl: false
        });


            if (scriptContext.request.method === 'GET') {
 


var formToUse=scriptContext.request.parameters.redirectForm || 'landForm';
log.debug('request params',formToUse);
                var user=runtime.getCurrentUser();
                var userID=user.id;

                var employeeListSearch=search.HolidayEmployeeListSearch(userID);
var exceptionSearchResult=search.exceptionEmployeeDaysSearch(employeeListSearch.employee_list_record_id);
if(exceptionSearchResult==false){
// да върне съобщение ако липсва документ
}else{

}
 var form=returnForms[formToUse](userID,exceptionSearchResult);
                scriptContext.response.writePage(form);
            }if(scriptContext.request.method === 'POST'){
           if(createRecord(scriptContext)){
            redirect.toSuitelet({
                scriptId: scriptID,
                deploymentId: deploymentID,
            })
           }

            }
            
        }


        return {onRequest:onRequest}

    });
