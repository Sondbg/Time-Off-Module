/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */

 define(['../Params'],
    function (params) {

        function buildTable(infoObj){
            var startingMonth;
            var tableHTML
if(!infoObj){
    startingMonth=new Date().getMonth()
}else{
    startingMonth=infoObj.month;
}

tableHTML=
`
<table style="border-collapse: collapse; width: 100%;" border="1">
<tbody>
<tr>
<td style="width: 14.2857%; text-align: center;background-color:#EF0000" colspan="7">
<h1>${params.CALENDAR.MONTHS[startingMonth]}</h1>
</td>
</tr>
<tr style="background-color: #a6ada8;">
`
for (var index = 0; index < 7; index++) {
    tableHTML+=`<td style="width: 14.2857%;">${params.CALENDAR.DAYS[index]}</td>`
    
};
tableHTML+="</tr>"  //close the days table row

var startingDay=new Date(new Date().getFullYear(),startingMonth,'1').getDay();
var lastDayOfMonth=new Date(new Date().getFullYear(),startingMonth,'0').getDate();
for (var day = 1;day <= lastDayOfMonth ; day++) {
    debugger;
    tableHTML+="<tr>"
  var dayOfWeek=new Date(new Date().getFullYear(),startingMonth,day).getDay();

    for (var tableRow=0; tableRow<7; tableRow++) {
       tableHTML+=`<td style="width: 14.2857%;">`
        if(dayOfWeek==tableRow){
            
            tableHTML+=`${day}`
            day++;
            dayOfWeek=new Date(new Date().getFullYear(),startingMonth,day).getDay();
        }else{
tableHTML+="&nbsp"
        }
        tableHTML+="</td>"
    
    }
    tableHTML+="</tr>"
}




tableHTML+="</tbody></table>";
return tableHTML
        }
return {
    buildTable
}

    })