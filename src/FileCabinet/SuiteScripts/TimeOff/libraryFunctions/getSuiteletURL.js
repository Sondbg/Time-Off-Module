/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
 define(['N/url','N/log'],

 function(url,log) {

function buildSuiteletURL(scriptID,deploymentID,recordID){
var suiteletURL=url.resolveScript({
    deploymentId: deploymentID,
    scriptId: scriptID,
    params:{
        timeOffID: recordID
    },
    returnExternalUrl: false
})
log.debug('suiteletURL',suiteletURL)

return suiteletURL
}
return buildSuiteletURL
 })