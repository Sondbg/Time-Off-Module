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
<style>
td#month{
    text-align: center;
     background-color: #7f9aaf;
     font-weight: bold;
}
tr#weekDays{
    background-color: #a6ada8
}
#weekDays td{
    font-weight: bold;
    font-size: medium;
    text-align: center;
}
</style>
<table style="border-collapse: collapse; width: 100%;" border="1">
<tbody>
<tr>
<td id="month" colspan="7">
<h1>${params.CALENDAR.MONTHS[startingMonth]}</h1>
</td>
</tr>
<tr id="weekDays">
`
for (var index = 1; index <= 7; index++) {
    tableHTML+=`<td style="width: 14.2857%;">${params.CALENDAR.DAYS[index]}</td>`
    
};
tableHTML+="</tr>"  //close the days table row

var startingDay=new Date(new Date().getFullYear(),startingMonth,'1').getDay();
var lastDayOfMonth=new Date(new Date().getFullYear(),startingMonth,'0').getDate();
for (var day = 1;day < lastDayOfMonth ; day++) {
    debugger;
    tableHTML+="<tr>"
  var dayOfWeek=new Date(new Date().getFullYear(),startingMonth,day).getDay();

    for (var tableRow=1; tableRow<=7; tableRow++) {
       tableHTML+=`<td style="width: 14.2857%;">`
        if(dayOfWeek==tableRow && day<lastDayOfMonth){
             
            tableHTML+=`${day}`
            day++;
            dayOfWeek=new Date(new Date().getFullYear(),startingMonth,day).getDay();
        }else if(dayOfWeek==0 && tableRow==7 && day<lastDayOfMonth){
            tableHTML+=`${day}`
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