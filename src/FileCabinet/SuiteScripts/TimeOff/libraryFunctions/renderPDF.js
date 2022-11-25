/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
 define(['N/render','N/log','N/record','../Params'],

 function(render,log,record,parameters) {
function renderPDF(recordId){
var myFile = render.create();

var recordInput=record.load({
    type: parameters.CUST_RECORDS.TIME_OFF_REQUEST,
    id: recordId
})

myFile.addRecord({
    templateName:'record',
    record:recordInput
});

myFile.setTemplateByScriptId({
    scriptId:parameters.CUST_RECORDS.PDF_TMPL
});
// log.debug({
//     title: 'pdf record load',
//     details: recordInput
// })
var pdfFile=myFile.renderAsPdf();
// log.debug('pdf file',pdfFile)

return pdfFile
}
    
return renderPDF
 })