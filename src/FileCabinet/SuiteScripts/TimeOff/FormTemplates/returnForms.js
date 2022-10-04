/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define(['./landingForm','./createForm'],
function(landingForm,createNew){
var landForm=landingForm.createLandingForm;
var create=createNew.createNewForm;
return {landForm,create}
})